import {fromJS} from 'immutable'
import Network from '../network'
import { myProjects, myOrganizations, myFriends } from './my_';

export const addFriend = user => {
    const network = new Network('SEND_FRIEND_REQUEST')
    return network.POST('/friends/' + user.get('id')).then(() => myFriends())
}

export const acceptFriend = friendship => {
    const network = new Network('ACCEPT_FRIEND_REQUEST')
    return network.PUT('/friends/accept/' + friendship.get('id')).then(() => myFriends())
}

export const declineFriend = friendship => {
    const network = new Network('DECLINE_FRIEND_REQUEST')
    return network.PUT('/friends/declined/' + friendship.get('id')).then(() => myFriends())
}

export const applyToOrganization = invitation => {
    const network = new Network('JOIN_ORGANIZATION')
    const organization = invitation.get('organization') || invitation
    return network.POST(`/organizations/${organization.get('id')}/join`).then(() => myOrganizations())
}

export const applyToProject = invitation => {
    const network = new Network('JOIN_PROJECT')
    const project = invitation.get('project') || invitation
    return network.POST(`/projects/${project.get('id')}/join`).then(() => myProjects())
}

