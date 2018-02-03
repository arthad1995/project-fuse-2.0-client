import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Timestamp from 'react-timestamp'
import { connect } from 'react-redux'
import { loadNotifications, markNotificationAsRead, loadInterviewSlotsFor, declineInvite } from '../../../actions/notifications'
import {stopEvent} from '../../common'

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
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
        const showSlots = () => {}
        const dispatchReadEvent = id => {
            dispatch({type: 'INTERVIEW_READ', id})
        }
        const handleInterviewInvite = (type, id) => (e) => {
            stopEvent(e)
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
        if(!this.props.notifications.get('fetched')) {
            return  (
                <div>
                    <h1>Notifications</h1>
                    <div className='loading' />
                </div>
            )
        }
        if (this.props.notifications.get('data') && this.props.notifications.get('data').size) {
            return (
                <div>
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

                            if (notification.get('objectType') && notification.get('data') && !notification.get('hasRead')) {
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
                                            <div className="btn tone1-1-color" onClick={handleInterviewInvite('projects', data.get('project').get('id'))}>
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
                                            <div className="btn tone1-1-color"  onClick={handleInterviewInvite('organizations', data.get('organization').get('id'))}>
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
                                        if(!notificationActions) {
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
                                    {notificationActions?
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
