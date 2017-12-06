import Network from '../network'

export const myFriends = () =>{
    const network = new Network('LOAD_FRIEND_INFO')
    return network.GET('/users/friends')
}

export const myProjects = () =>{
    const network = new Network('LOAD_MY_PROJECTS')
    return network.GET('/users/joined/projects')
}

export const myTeams = () =>{
    const network = new Network('LOAD_MY_TEAMS')
    return network.GET('/users/joined/teams')
}
export const myOrganizations = () =>{
    const network = new Network('LOAD_MY_ORGANIZATIONS')
    return network.GET('/users/joined/organizations')
}