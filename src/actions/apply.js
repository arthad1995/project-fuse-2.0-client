import Network from '../network'
import { myProjects } from './my_';

export const addFriend = (user, dispatch) => {
    dispatch({
        type: "ADD_FRIEND",
        payload: {
            id: user.get('id'),
            name: user.get('name')
        }
    })
}

export const applyToOrganization = (organization, dispatch) => {
    dispatch({
        type: "APPLY_TO_ORGANIZATION",
        payload: {
            id: organization.get('id'),
            name: organization.get('name')
        }
    })
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

