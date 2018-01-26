import Network from '../network'

export const searchUsers = ({query = '', page=0, pageSize=15}) =>{
    const network = new Network('SEARCH_USERS_INFO')
    return network.POST('/search/users', {query})
}

export const searchProjects = ({query = '', page=0, pageSize=15}) =>{
    const network = new Network('SEARCH_PROJECT_INFO')
    return network.POST('/search/projects', {query})
}

export const searchTeams = (searchParams = {}) =>{
    const network = new Network('SEARCH_TEAM_INFO')
    return network.POST('/search/teams')
}

export const searchOrganizations = ({query = '', page=0, pageSize=15}) =>{
    const network = new Network('SEARCH_ORGANIZATION_INFO')
    return network.POST('/search/organizations', {query})
}

export const globalSearch = ({query = '', page=0, pageSize=15}) => {
    const network = new Network('GLOBAL_SEARCH_INFO')
    return network.POST(`/search?page=${page}&size=${pageSize}`, {query})
}
