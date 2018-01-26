import Network from '../network'


export const loadProjectApplicants = (id, status="pending") => {
    const network = new Network('LOAD_PROJECT_APPLICANTS')
    return network.GET(`/projects/${id}/applicants/${status}`)
}

export const loadOrganizationApplicants = (id, status="pending") => {
    const network = new Network('LOAD_ORGANIZATION_APPLICANTS')
    return network.GET(`/organizations/${id}/applicants/${status}`)
}
