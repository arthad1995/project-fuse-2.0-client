import Network from '../network'

export const logout = () =>{
    const network = new Network('LOGOUT')
    return network.POST('/users/logout')
}

export const login = (email, password) =>{
    const network = new Network('LOGIN')
    return network.POST('/users/login', {
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
