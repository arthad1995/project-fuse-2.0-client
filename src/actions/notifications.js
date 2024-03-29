import Network from '../network'
import Cookies from 'js-cookie'

export const loadNotifications = (status = 'all') => {
    const network = new Network('LOAD_NOTIFICATIONS')
    return network.GET(`/notifications/${status}`)
}

export const markNotificationAsRead = id => {
    const network = new Network('MARK_NOTIFICATION_READ')
    return network.PUT(`/notifications/${id}/read`).then(() => loadNotifications())
}

export const markNotificationAsDone = id =>{
    const network = new Network('MARK_NOTIFICATION_DONE')
    return network.PUT(`/notifications/${id}/done`).then(() => loadNotifications())
}

export const loadInterviewSlotsFor = (type, id) => {
    const network = new Network('LOAD_INTERVIEW_SLOTS')
    return network.GET(`/${type}/${id}/interview_slots/available`)
}

export const declineInvite = (type, payload) => {
    const network = new Network('DECLINE_INVITE')
    return network.POST(`/users/decline/invite/${type}`, payload)
}

export const acceptInvite = (type, payload) => {
    const network = new Network('ACCEPT_INVITE')
    return network.POST(`/users/accept/invite/${type}`, payload)
}
