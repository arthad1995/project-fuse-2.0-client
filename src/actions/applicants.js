import Network from '../network'


export const loadProjectApplicants = (id, status="pending") => {
    const network = new Network('LOAD_PROJECT_APPLICANTS')
    return network.GET(`/projects/${id}/applicants/${status}`)
}

export const loadOrganizationApplicants = (id, status="pending") => {
    const network = new Network('LOAD_ORGANIZATION_APPLICANTS')
    return network.GET(`/organizations/${id}/applicants/${status}`)
}

export const declineApplicant = (groupType, groupId, appId) => {
    const network = new Network('DECLINE_APPLICANT')
    return network.PUT(`/${groupType}/${groupId}/applicants/${appId}/declined`)
}

export const scheduleInterview = (groupType, groupId, appId) => {
    const network = new Network('SCHEDULE_APPLICANT_INTERVIEW')
    return network.PUT(`/${groupType}/${groupId}/applicants/${appId}/interview_scheduled`)
}

export const inviteAppToJoin = (groupType, groupId, appId) => {
    const network = new Network('SEND_APPLICANT_JOIN_INVITE')
    return network.PUT(`/${groupType}/${groupId}/applicants/${appId}/invited`)
}

export const cancelAppInterview = (groupType, groupId, appId) => {
    const network = new Network('CANCEL_APPLICANT_INTERVIEW')
    return network.PUT(`/${groupType}/${groupId}/applicants/${appId}/pending`)
}

export const reconsiderApplicant = (groupType, groupId, appId) => {
    const network = new Network('RECONSIDER_APPLICANT')
    return network.PUT(`/${groupType}/${groupId}/applicants/${appId}/pending`)
} 
