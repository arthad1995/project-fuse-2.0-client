import Network from '../network'

export const createProject = (values) =>{ 
    const network = new Network('CREATE_PROJECT')
    network.POST('/projects',{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    })
}

export const createTeam = values => {
    const network = new Network('CREATE_TEAM')
    network.POST('/teams',{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    })
} 

export const createOrganization = values => {
    const network = new Network('CREATE_ORGANIZATION')
    network.POST('/organizations',{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    })
}
