import Network from '../network'
import store from '../store'

export const loadSummaries = orgId => {
    store.dispatch({type: `SET_STATISTICS_ORG_ID`, payload: orgId})

    const networks = [
        {
            network: new Network('LOAD_INVALID_PROFILE_SUMMARY'),
            endpoint: `/statistics/organizations/${orgId}/members/invalid-profiles/summary`
        },
        {
            network: new Network('LOAD_PROJECT_INTERVIEW_SUMMARY'),
            endpoint: `/statistics/organizations/${orgId}/project/interview/summary`
        },
        {
            network: new Network('LOAD_MEMBER_INTERVIEW_SUMMARY'),
            endpoint: `/statistics/organizations/${orgId}/member/interview/summary`
        }
    ]
    return Promise.all(
        networks.map(
            req => req.network.GET(req.endpoint)
        )
    )
}

export const loadInvalidProfileBreakdown = orgId => {
    return (new Network('LOAD_INVALID_PROFILE_BREAKDOWN')).GET(
        `/statistics/organizations/${orgId}/members/invalid-profiles/breakdown`
    )
}

export const loadProjectInterviewBreakdown = orgId => {
    return (new Network('LOAD_PROJECT_INTERVIEW_BREAKDOWN')).GET(
        `/statistics/organizations/${orgId}/project/interview/breakdown`
    )
}

export const loadUserInterviewBreakdown = orgId => {
    return (new Network('LOAD_MEMBER_INTERVIEW_BREAKDOWN')).GET(
        `/statistics/organizations/${orgId}/project/member/interview/breakdown`
    )
}

