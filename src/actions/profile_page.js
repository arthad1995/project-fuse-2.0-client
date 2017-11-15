import Network from '../network'

export const loadUser = (id) =>{
    const network = new Network('LOAD_USER_BY_ID')
    network.GET(`/user/${id}`)
}

export const loadProject = (id) => {
    const network = new Network('LOAD_PROJECT_BY_ID')
    network.GET(`/project/${id}`)
}

export const loadTeam = (id) => {
    const network = new Network('LOAD_TEAM_BY_ID')
    network.GET(`/team/${id}`)
}

export const loadOrganization = (id) => {
    const network = new Network('LOAD_ORGANIZATION_BY_ID')
    network.GET(`/organization/${id}`)
}
