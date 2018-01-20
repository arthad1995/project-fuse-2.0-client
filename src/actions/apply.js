import Network from '../network'
import { myProjects, myOrganizations } from './my_';

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

