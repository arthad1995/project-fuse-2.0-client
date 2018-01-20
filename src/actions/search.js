import Network from '../network'

export const searchUsers = ({query = ''}) =>{
    const network = new Network('SEARCH_USERS_INFO')
    return network.POST('/search/users', {query})
}

export const searchProjects = ({query = ''}) =>{
    const network = new Network('SEARCH_PROJECT_INFO')
    return network.POST('/search/projects', {query})
}

export const searchTeams = (searchParams = {}) =>{
    const network = new Network('SEARCH_TEAM_INFO')
    return network.POST('/search/teams')
}

export const searchOrganizations = ({query = ''}) =>{
    const network = new Network('SEARCH_ORGANIZATION_INFO')
    return network.POST('/search/organizations', {query})
}

export const globalSearch = ({query = ''}) => {
    const network = new Network('GLOBAL_SEARCH_INFO')
    return network.POST('/search', {query})
}
