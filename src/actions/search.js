import Network from '../network'

export const searchUsers = (searchParams = {}) =>{
    const network = new Network('LOAD_USERS_INFO')
    network.GET('/users')
}

export const searchProjects = (searchParams = {}) =>{
    const network = new Network('LOAD_PROJECT_INFO')
    network.GET('/projects')
}

export const searchTeams = (searchParams = {}) =>{
    const network = new Network('LOAD_TEAM_INFO')
    network.GET('/teams')
}
export const searchOrganizations = (searchParams = {}) =>{
    const network = new Network('LOAD_ORGANIZATION_INFO')
    network.GET('/organizations')
}