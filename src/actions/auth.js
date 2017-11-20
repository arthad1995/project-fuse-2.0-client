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

export const register = (name, email, password) => {
    let payload = {
        name,
        email,
        password
    }
    const network = new Network('REGISTER')
    return network.REGISTER(payload)
}
