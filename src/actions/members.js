import Network from '../network'


export const loadProjectMembers = (id) => {
    const network = new Network('LOAD_PROJECT_MEMBERS')
    return network.GET(`/projects/${id}/members`)
}

export const loadTeamMembers = (id) => {
    const network = new Network('LOAD_TEAM_MEMBERS')
    return network.GET(`/teams/${id}/members`)
}

export const loadOrganizationMembers = (id) => {
    const network = new Network('LOAD_ORGANIZATION_MEMBERS')
    return network.GET(`/organizations/${id}/members`)
}