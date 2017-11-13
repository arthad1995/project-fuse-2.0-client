import Network from '../network'

export const logout = () =>{
    const network = new Network('LOGOUT')
    network.POST('/user/logout')
}

export const login = (email, password) =>{
    const network = new Network('LOAD_USER')
    network.POST('/user/login', {
        email,
        password
    })
}
