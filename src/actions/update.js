import Network from '../network'

export const updateProject = history => id =>(values) =>{ 
    const network = new Network('UPDATE_PROJECT')
    network.PUT(`/project/${id}`,{
        name: values.name
    }).then(()=>history.push(`/projects/${id}`))
}

export const updateTeam = history => id => values => {
    const network = new Network('UPDATE_TEAM')
    network.POST(`/team/${id}`,{
        name: values.name
    }).then(()=>history.push(`/teams/${id}`))
} 

export const updateOrganization = history => id => values => {
    const network = new Network('UPDATE_ORGANIZATION')
    network.POST(`/organization/${id}`,{
        name: values.name
    }).then(()=>history.push(`/organizations/${id}`))
}
