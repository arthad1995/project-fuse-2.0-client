import Network from '../network'

export const searchUsers = (searchParams = {}) =>{
    const network = new Network('LOAD_USERS_INFO')
    network.GET('/user/all')
}
