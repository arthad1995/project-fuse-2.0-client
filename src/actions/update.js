import Network from '../network'

export const updateProject = history => id =>(values) =>{ 
    console.log("Updating")
    const network = new Network('UPDATE_PROJECT')
    return network.PUT(`/project/${id}/update`,{
        name: values.name
    }).then(()=>history.push(`/projects/${id}`))
}

export const updateTeam = history => id => values => {
    const network = new Network('UPDATE_TEAM')
    return network.PUT(`/team/${id}/update`,{
        name: values.name
    }).then(()=>history.push(`/teams/${id}`))
} 

export const updateOrganization = history => id => values => {
    const network = new Network('UPDATE_ORGANIZATION')
    return network.PUT(`/organization/${id}/update`,{
        name: values.name
    }).then(()=>history.push(`/organizations/${id}`))
}

export const updateCurrentUser = history => id => values => {
    const network = new Network('UPDATE_USER')
    return network.PUT('/user/update_current', {
        name: values.name
    }).then(() => history.push(`/users/${id}`))
}
