import Network from '../network'

export const searchUsers = (searchParams = {}) =>{
    const network = new Network('LOAD_USERS_INFO')
    network.GET('/user/all')
}

export const searchProjects = (searchParams = {}) =>{
    const network = new Network('LOAD_PROJECT_INFO')
    network.GET('/project/all')
}
