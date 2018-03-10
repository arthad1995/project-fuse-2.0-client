import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Timestamp from 'react-timestamp'
import { connect } from 'react-redux'
import {
    loadNotifications,
    markNotificationAsRead,
    markNotificationAsDone,
    loadInterviewSlotsFor,
    declineInvite,
    acceptInvite
} from '../../../actions/notifications'
import { acceptFriend, declineFriend, applyToOrganization, applyToProject } from '../../../actions/apply'
import {stopEvent} from '../../common'
import {fromJS} from 'immutable'

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications,
        slots: state.interview_slots,
        showSlots: state.ui.get('show_interview_slots'),
        selectedSlot: state.ui.get('selected_timeslot'),
        inviteInfo: state.ui.get('invite_info')
    }
}

@connect(mapStateToProps)
class Notifications extends Component {
    constructor(props) {
        super(props)
        this.showWelcomeMessage = this.showWelcomeMessage.bind(this)
    }

    componentWillMount() {
        loadNotifications()
    }

    render() {
        const isHome = this.props.match.path === '/'
        let history = this.props.history
        const dispatch = this.props.dispatch
        const showSlots = () => {
            dispatch({type: 'SHOW_INTERVIEW_SLOTS'})
        }
        const hideSlots = () => {
            dispatch({type: 'HIDE_INTERVIEW_SLOTS'})
        }
        const selectTimeslot = id => {
            dispatch({type: 'SELECT_TIMESLOT', value: id})
        }
        const dispatchReadEvent = id => {
            dispatch({type: 'NOTIFICATION_READ', id})
        }
        const dispatchDoneEvent = id => {
            dispatch({type: 'NOTIFICATION_DONE', id})
        }
        const handleInterviewInvite = (type,id, inviteId, notifId) => (e) => {
            stopEvent(e)
            dispatch({type: 'SET_INVITE_INFO',value: {
                type,
                id,
                inviteId,
                notifId
            }})
            showSlots()
            loadInterviewSlotsFor(type, id)
        }
        const markRead = id => {
            dispatchReadEvent(id)
            markNotificationAsRead(id)
        }
        const markReadAction = id => e => {
            stopEvent(e)
            markRead(id)
        }
        const markDone = id => {
            dispatchDoneEvent(id)
            markNotificationAsDone(id)
        }
        const handleDeclineInvite = (type, payload, notifId) => e => {
            stopEvent(e)
            markDone(notifId)
            declineInvite(type, payload)
        }
        const slot = this.props.selectedSlot
        const props = this.props
        const scheduleInterview = e => {
            stopEvent(e)
            const inviteInfo = props.inviteInfo
            markDone(inviteInfo.get('notifId'))
            const payload = {
                id: inviteInfo.get('inviteId'),
                interview: {
                    id: slot
                }
            }
            acceptInvite(inviteInfo.get('type').slice(0, -1),payload).then(() => hideSlots())
        }
        if(!this.props.notifications.get('origData')) {
            if(this.props.notifications.get('fetching')) {
                return  (
                    <div>
                        {isHome ? '' : <h1>Notifications</h1>}
                        <div className='loading' />
                    </div>
                )
            }
            else {
                return (
                    <div>
                        {isHome ? '' : <h1>Notifications</h1>}
                        <h3>You have no notifications</h3>
                    </div>
                )
            }
        }
        if (this.props.notifications.get('origData') && this.props.notifications.get('origData').size) {
            return (
                <div>
                    <div id="popup" className={`modalDialog ${this.props.showSlots ? 'show' : ''}`} onClick={(e) => { stopEvent(e); hideSlots() }}>
                        <div onClick={(e) => { stopEvent(e); return false; }}>
                            <div className="modal_close" onClick={(e) => { stopEvent(e); hideSlots() }}></div>
                            <h2>Select an Interview Time Slot</h2>
                            {this.props.slots.get('fetching') ? <div className="loading" /> :
                                <div>
                                    {(this.props.slots.get('data') || fromJS({})).valueSeq().toArray().map(e => {
                                        return (
                                            <div
                                                key={e.get('id')}
                                                className={`btn ${e.get('id') === slot? 'tone1-4-color' : slot? 'tone1-3-color' : 'tone1-1-color'}`}
                                                onClick={() => selectTimeslot(e.get('id'))}
                                            >
                                                <Timestamp time={e.get('start')} format='full' /> - <Timestamp time={e.get('end')} format='full' />
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            <div className="modal__btns">
                                {slot ?
                                    <div className="btn tone1-1-color" onClick={scheduleInterview}>Schedule</div>
                                    : ''
                                }
                                <div className="btn tone2-1-color" onClick={(e) => { stopEvent(e); hideSlots() }}>Cancel</div>
                            </div>
                        </div>
                    </div>
                    {isHome ? '' : <h1>Notifications</h1>}
                    <div className="notifications">
                        {this.props.notifications.get('origData').toArray().map(notification => {
                            const className = (!notification.get('hasRead') && !isHome) ? 'read' : 'unread';
                            let notificationActions = null
                            let Wrapper = (e => <div
                                key={notification.get('id')}
                                onClick={() => {
                                    dispatchReadEvent(notification.get('id'))
                                    markNotificationAsRead(notification.get('id'))
                                }}
                            >
                                {e}
                            </div>
                            );

                            let link = false;
                            if (notification.get('notification_type') && notification.get('data')) {
                                const data = notification.get('data')
                                switch(notification.get('notification_type')) {
                                    case 'ProjectApplicant:Info':
                                        link = `/projects/${data.get('project').get('id')}/applicants`
                                        break
                                    case 'ProjectJoined:Info':
                                        link = `/projects/${data.get('id')}/members`
                                        break
                                    case 'ProjectInvitation:Pending':
                                        notificationActions = <div>
                                            <div
                                                className="btn tone1-4-color"
                                                onClick={()=>history.push(`/projects/${data.get('project').get('id')}`)}
                                            >
                                                View
                                            </div>
                                            <div className="btn tone1-1-color" onClick={(e) => {
                                                stopEvent(e)
                                                applyToProject(data).then(() => markNotificationAsDone(notification.get('id')))
                                                markNotificationAsRead(notification.get('id'))
                                                return false
                                            }}>
                                                Join
                                            </div>
                                            <div className="btn tone2-1-color" onClick={handleDeclineInvite('project',{
                                                project:{id: data.get('project').get('id')},
                                                id: data.get('id')
                                            }, notification.get('id'))}>
                                                Decline
                                            </div>
                                        </div>
                                        break
                                    case 'ProjectInterview:Pending':
                                        notificationActions = <div>
                                            <div
                                                className="btn tone1-4-color"
                                                onClick={()=>history.push(`/projects/${data.get('project').get('id')}`)}
                                            >
                                                View
                                            </div>
                                            <div className="btn tone1-1-color" onClick={handleInterviewInvite('projects', data.get('project').get('id'), data.get('id'), notification.get('id'))}>
                                                Accept
                                            </div>
                                            <div className="btn tone2-1-color" onClick={handleDeclineInvite('project',{
                                                project:{id: data.get('project').get('id')},
                                                id: data.get('id')
                                            }, notification.get('id'))}>
                                                Decline
                                            </div>
                                        </div>
                                        break
                                    case 'OrganizationInterview:Pending':
                                        notificationActions = <div>
                                            <div
                                                className="btn tone1-4-color"
                                                onClick={()=>history.push(`/organizations/${data.get('organization').get('id')}`)}
                                            >
                                                View
                                            </div>
                                            <div className="btn tone1-1-color"  onClick={handleInterviewInvite('organizations', data.get('organization').get('id'), data.get('id'), notification.get('id'))}>
                                                Accept
                                            </div>
                                            <div className="btn tone2-1-color" onClick={handleDeclineInvite('organization',{
                                                organization:{id: data.get('organization').get('id')},
                                                id: data.get('id')
                                            }, notification.get('id'))}>
                                                Decline
                                            </div>
                                        </div>
                                        break
                                    case 'OrganizationInvitation:Pending':
                                        notificationActions = <div>
                                            <div
                                                className="btn tone1-4-color"
                                                onClick={()=>history.push(`/organizations/${(data.get('organizations') || fromJS({})).get('id')}`)}
                                            >
                                                View
                                            </div>
                                            <div className="btn tone1-1-color" onClick={(e) => {
                                                stopEvent(e)
                                                applyToOrganization(data).then(() => markNotificationAsDone(notification.get('id')))
                                                markNotificationAsRead(notification.get('id'))
                                                return false
                                            }}>
                                                Join
                                            </div>
                                            <div className="btn tone2-1-color"  onClick={handleDeclineInvite('organization',{
                                                project:{id: data.get('organization').get('id')},
                                                id: data.get('id')
                                            }, notification.get('id'))}>
                                                Decline
                                            </div>
                                        </div>
                                        break
                                    case 'OrganizationApplicant:Info':
                                        link = `/organizations/${data.get('organization').get('id')}/applicants`
                                        break
                                    case 'OrganizationJoined:Info':
                                        link = `/organizations/${data.get('id')}/members`
                                        break
                                    case 'FriendRequest:Pending':
                                        notificationActions = <div>
                                            <div
                                                className="btn tone1-4-color"
                                                onClick={()=>history.push(`/users/${data.get('receiver').get('id')}`)}
                                            >
                                                View
                                            </div>
                                            <div className="btn tone1-1-color" onClick={(e) => {
                                                stopEvent(e)
                                                acceptFriend(data).then(() => markNotificationAsDone(notification.get('id')))
                                                markNotificationAsRead(notification.get('id'))
                                                return false
                                            }}>
                                                Accept
                                            </div>
                                            <div className="btn tone2-1-color" onClick={(e) => {
                                                stopEvent(e)
                                                declineFriend(data).then(() => markNotificationAsDone(notification.get('id')))
                                                markNotificationAsRead(notification.get('id'))
                                                return false
                                            }}>
                                                Dismiss
                                            </div>
                                        </div>
                                        break
                                    case 'FriendRequest:Accepted':
                                        link = `/users/${data.get('receiver').get('id')}`
                                        break
                                }
                            }

                            return Wrapper(
                                <div onClick={markReadAction(notification.get('id'))} className={`notification--${className}`}>
                                    <div className={`notification--${className}__message`}>
                                        {notification.get('message')}
                                    </div>
                                    {link?
                                        <div className={`notification--${className}__actions`}>
                                            <div>
                                                <div
                                                    className="btn tone1-4-color"
                                                    onClick={()=>history.push(link)}
                                                >
                                                    View
                                                </div>
                                            </div>
                                        </div> :
                                        notificationActions && !notification.get('action_done') ?
                                            <div className={`notification--${className}__actions`}>
                                                {notificationActions}
                                            </div>
                                            : ''
                                    }
                                    <div className={`notification--${className}__footer`}>
                                        <div className={`notification--${className}__footer__time`}>
                                            <Timestamp autoUpdate time={notification.get('time')} />
                                        </div>
                                        {!notificationActions && !notification.get('hasRead') && !isHome ?
                                            <div onClick={markReadAction(notification.get('id'))}
                                                className='notification--unread__footer__mark-read'>
                                                Mark Read
                                            </div> : ''}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        return (
            <div>
                {isHome ? '' : <h1>Notifications</h1>}
                {isHome? this.showWelcomeMessage() : <h3>No Results Found</h3>}
            </div>
        )
    }

    showWelcomeMessage () {
        return <div className="welcome">
            <h1><i className="em-svg em-tada"></i> Welcome! <i className="em-svg em-tada"></i></h1>
            <div>
                <div>
                    We're glad to have you here!
                </div>
                <div>
                    To get started, you should first update your profile. You can do that by clicking on the profile icon in the upper-right corner and then hitting the Edit Icon <i className='fas fa-pencil-alt'></i>.
                </div>
                <div>
                    Once you are done, click on the "Home" link on the left and then click on "Friends" to find new friends, "Projects" to join a public project, or "Organziations" to join a class, non-profit, or business.
                </div>
                <div>
                    If you ever get lost, Just click on the Project Fuse logo in the upper-left corner to come back here.
                </div>
                <div>
                    Once you start getting invitations and notifications we'll show those here.
                </div>
                <div>
                    Have fun! <i className="em-svg em-smile"></i>
                </div>
            </div>
        </div>
    }
}

export default Notifications
