import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Timestamp from 'react-timestamp'
import { connect } from 'react-redux'
import { loadNotifications, markNotificationAsRead, loadInterviewSlotsFor, declineInvite, acceptInvite } from '../../../actions/notifications'
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
    }

    componentWillMount() {
        loadNotifications()
    }

    render() {
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
            dispatch({type: 'INTERVIEW_READ', id})
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
        const handleDeclineInvite = (type, payload, notifId) => e => {
            stopEvent(e)
            markRead(notifId)
            declineInvite(type, payload)
        }
        const slot = this.props.selectedSlot
        const props = this.props
        const scheduleInterview = e => {
            stopEvent(e)
            const inviteInfo = props.inviteInfo
            markRead(inviteInfo.get('notifId'))
            const payload = {
                id: inviteInfo.get('inviteId'),
                interview: {
                    id: slot
                }
            }
            acceptInvite(inviteInfo.get('type').slice(0, -1),payload).then(() => hideSlots())
        }
        if(!this.props.notifications.get('data')) {
            if(this.props.notifications.get('fetching')) {
                return  (
                    <div>
                        <h1>Notifications</h1>
                        <div className='loading' />
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <h1>Notifications</h1>
                        <h3>You have no notificatoions</h3>
                    </div>
                )
            }
        }
        if (this.props.notifications.get('data') && this.props.notifications.get('data').size) {
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
                    <h1>Notifications</h1>
                    <div className="notifications">
                        {this.props.notifications.get('data').valueSeq().toArray().reverse().map(notification => {
                            const className = notification.get('hasRead') ? 'read' : 'unread';
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

                            if (notification.get('objectType') && notification.get('data')) {
                                const data = notification.get('data')
                                let link = false;
                                switch(notification.get('objectType')) {
                                    case 'ProjectApplicant':
                                        link = `/projects/${data.get('id')}/applicants`
                                        break
                                    case 'ProjectInvitation':
                                        notificationActions = <div>
                                            <div className="btn tone1-1-color" onClick={stopEvent}>
                                                Join
                                            </div>
                                            <div className="btn tone2-1-color" onClick={handleDeclineInvite('project',{
                                                project:{id: data.get('project').get('id')},
                                                id: data.get('id')
                                            }, notification.get('id'))}>
                                                Decline
                                            </div>
                                        </div>
                                        link = `/projects/${notification.get('id')}`
                                        break
                                    case 'ProjectInterview:Invite':
                                        notificationActions = <div>
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
                                        link = `/projects/${data.get('project').get('id')}`
                                        break
                                    case 'OrganizationInterview:Invite':
                                        notificationActions = <div>
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
                                        link = `/organizations/${data.get('organization').get('id')}`
                                        break
                                    case 'OrganizationInvitation':
                                        notificationActions = <div>
                                            <div className="btn tone1-1-color" onClick={stopEvent}>
                                                Join
                                            </div>
                                            <div className="btn tone2-1-color"  onClick={handleDeclineInvite('organization',{
                                                project:{id: data.get('organization').get('id')},
                                                id: data.get('id')
                                            }, notification.get('id'))}>
                                                Decline
                                            </div>
                                        </div>
                                        link = `/organizations/${data.get('id')}`
                                        break
                                    case 'OrganizationApplicant':
                                        link = `/organizations/${data.get('id')}/applicants`
                                        break
                                    case 'Friend:Request':
                                        notificationActions = <div>
                                            <div className="btn tone1-1-color" onClick={stopEvent}>
                                                Accept
                                            </div>
                                            <div className="btn tone2-1-color" onClick={stopEvent}>
                                                Dismiss
                                            </div>
                                        </div>
                                    case 'Friend:Accepted':
                                        link = `/users/${data.get('id')}`
                                        break
                                }
                                if (link) {
                                    Wrapper = (e => <span className="clickable" onClick={()=>{
                                        if(!notificationActions && !notification.get('hasRead')) {
                                            markNotificationAsRead(notification.get('id')).then(
                                                () => {
                                                    history.push(link)
                                                }
                                            )
                                        } else {
                                            history.push(link)
                                        }
                                    }} key={notification.get('id')}>{e}</span>)
                                }
                            }

                            return Wrapper(
                                <div className={`notification--${className}`}>
                                    <div className={`notification--${className}__message`}>
                                        {notification.get('message')}
                                    </div>
                                    {notificationActions && !notification.get('hasRead')?
                                        <div className={`notification--${className}__actions`}>
                                            {notificationActions}
                                        </div>
                                        : ''
                                    }
                                    <div className={`notification--${className}__footer`}>
                                        <div className={`notification--${className}__footer__time`}>
                                            <Timestamp autoUpdate time={notification.get('time')} />
                                        </div>
                                        {!notificationActions && !notification.get('hasRead') ?
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
                <h1>Notifications</h1>
                <h3>No Results Found</h3>
            </div>
        )
    }
}

export default Notifications
