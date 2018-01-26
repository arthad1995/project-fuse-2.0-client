import Network from '../network'

export const userProjects = (id) =>{
    const network = new Network('PROJECTS_FOR_USER')
    return network.GET(`/users/${id}/joined/projects`)
}

export const userOrganizations = (id) =>{
    const network = new Network('ORGANIZATIONS_FOR_USER')
    return network.GET(`/users/${id}/joined/organizations`)
}
