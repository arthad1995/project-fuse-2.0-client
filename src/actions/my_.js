import Network from '../network'
import Cookies from 'js-cookie'

export const myFriends = () =>{
    const network = new Network('LOAD_FRIEND_INFO')
    //return network.GET('/users/friends')
}

export const myProjects = () =>{
    const network = new Network('LOAD_MY_PROJECTS')
    const network2 = new Network('LOAD_APPLIED_PROJECTS')
    return Promise.all([
        network.GET(`/users/${Cookies.get('ID')}/joined/projects`),
        network2.GET(`/users/${Cookies.get('ID')}/projects/applications?not_status=accepted`)
    ])
}

export const myTeams = () =>{
    const network = new Network('LOAD_MY_TEAMS')
    return network.GET(`/users/${Cookies.get('ID')}/joined/teams`)
}

export const myOrganizations = () =>{
    const network = new Network('LOAD_MY_ORGANIZATIONS')
    const network2 = new Network('LOAD_APPLIED_ORGANIZATIONS')
    return Promise.all([
        network.GET(`/users/${Cookies.get('ID')}/joined/organizations`),
        network2.GET(`/users/${Cookies.get('ID')}/organizations/applications?not_status=accepted`)
    ])
}