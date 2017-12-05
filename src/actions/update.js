import Network from '../network'

export const updateProject = history => id =>(values) =>{ 
    const network = new Network('UPDATE_PROJECT')
    return network.PUT(`/projects/${id}`,{
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    }).then(()=>history.push(`/projects/${id}`))
}

export const updateTeam = history => id => values => {
    const network = new Network('UPDATE_TEAM')
    return network.PUT(`/teams/${id}`,{
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    }).then(()=>history.push(`/teams/${id}`))
} 

export const updateOrganization = history => id => values => {
    const network = new Network('UPDATE_ORGANIZATION')
    return network.PUT(`/organizations/${id}`,{
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    }).then(()=>history.push(`/organizations/${id}`))
}

export const updateCurrentUser = history => id => values => {
    const network = new Network('UPDATE_USER')
    return network.PUT(`/users/${id}`, {
        profile:{
            headline: values.headline,
            summary: values.summary,
            skills: values.skills
        }
    }).then(() => history.push(`/users/${id}`))
}
