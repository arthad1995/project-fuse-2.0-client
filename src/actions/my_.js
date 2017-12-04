import Network from '../network'

export const myFriends = () =>{
    const network = new Network('LOAD_FRIEND_INFO')
    network.GET('/user/friends')
}

export const myProjects = () =>{
    const network = new Network('LOAD_MY_PROJECTS')
    network.GET('/user/joined/projects')
}

export const myTeams = () =>{
    const network = new Network('')
    network.GET('/user/joined/teams')
}
export const myOrganizations = () =>{
    const network = new Network('LOAD_MY_ORGANIZATIONS')
    network.GET('/user/joined/organizations')
}