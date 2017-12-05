import Network from '../network'

export const loadUser = (id) =>{
    const network = new Network('LOAD_USERS_BY_ID')
    return network.GET(`/users/${id}`)
}

export const loadProject = (id) => {
    const network = new Network('LOAD_PROJECT_BY_ID')
    return network.GET(`/projects/${id}`)
}

export const loadTeam = (id) => {
    const network = new Network('LOAD_TEAM_BY_ID')
    return network.GET(`/teams/${id}`)
}

export const loadOrganization = (id) => {
    const network = new Network('LOAD_ORGANIZATION_BY_ID')
    return network.GET(`/organizations/${id}`)
}

export const loadProjectSettings = (id) => {
    const network = new Network('LOAD_PROJECT_BY_ID_SETTINGS')
    return loadProject(id).then(()=>{
        return network.GET(`/projects/${id}/interview_slots/available`)
    })
}

export const loadTeamSettings = (id) => {
    const network = new Network('LOAD_TEAM_BY_ID_SETTINGS')
    return loadTeam(id).then(()=>{
        return network.GET(`/teams/${id}/interview_slots/available`)
    });
}

export const loadOrganizationSettings = (id) => {
    const network = new Network('LOAD_ORGANIZATION_BY_ID_SETTINGS')
    return loadOrganization(id).then(()=>{
        return network.GET(`/organizations/${id}/interview_slots/available`)
    })
}
