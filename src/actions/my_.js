import Network from '../network'

export const myFriends = () =>{
    const network = new Network('LOAD_FRIEND_INFO')
    network.GET('/users/friends')
}

export const myProjects = () =>{
    const network = new Network('LOAD_MY_PROJECTS')
    network.GET('/users/joined/projects')
}

export const myTeams = () =>{
    const network = new Network('')
    network.GET('/users/joined/teams')
}
export const myOrganizations = () =>{
    const network = new Network('LOAD_MY_ORGANIZATIONS')
    network.GET('/users/joined/organizations')
}