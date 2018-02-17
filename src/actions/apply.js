import Network from '../network'
import { myProjects, myOrganizations, myFriends } from './my_';

export const addFriend = (user, dispatch) => {
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

export const applyToOrganization = (organization, dispatch) => {
    const network = new Network('JOIN_ORGANIZATION')
    return network.POST(`/organizations/${organization.get('id')}/join`).then(() => myOrganizations())
}

export const applyToTeam = (team, dispatch) => {
    dispatch({
        type: "APPLY_TO_TEAM",
        payload: {
            id: team.get('id'),
            name: team.get('name')
        }
    })
}

export const applyToProject = (project, dispatch) => {
    const network = new Network('JOIN_PROJECT')
    return network.POST(`/projects/${project.get('id')}/join`).then(() => myProjects())
}

