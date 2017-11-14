import Network from '../network'

export const loadUser = (id) =>{
    const network = new Network('LOAD_USER_BY_ID')
    network.GET(`/user/${id}`)
}
