import Network from '../network'

export const createProject = (values) =>{
    const network = new Network('CREATE_PROJECT')
    return network.POST('/projects',{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary,
            tags: values.tags 
        },
        organization: {
            id: values.orgId || null
        }
    })
}

export const createTeam = values => {
    const network = new Network('CREATE_TEAM')
    return network.POST('/teams',{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    })
}

export const createOrganization = values => {
    const network = new Network('CREATE_ORGANIZATION')
    return network.POST('/organizations',{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary,
            tags: values.tags
        }
    })
}
