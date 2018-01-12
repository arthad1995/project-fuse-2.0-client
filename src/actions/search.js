import Network from '../network'

export const searchUsers = (searchParams = {}) =>{
    const network = new Network('LOAD_USERS_INFO')
    return network.GET('/users')
}

export const searchProjects = (searchParams = {}) =>{
    const network = new Network('LOAD_PROJECT_INFO')
    return network.GET('/projects')
}

export const searchTeams = (searchParams = {}) =>{
    const network = new Network('LOAD_TEAM_INFO')
    return network.GET('/teams')
}

export const searchOrganizations = (searchParams = {}) =>{
    const network = new Network('LOAD_ORGANIZATION_INFO')
    return network.GET('/organizations')
}

export const globalSearch = ({query = ''}) => {
    const network = new Network('GLOBAL_SEARCH_INFO')
    return network.POST('/search', {query})
}
