import _ from 'lodash'

const initialState = {
    orgId: 0,
    invalid_profile_summary: {
        fetched: false,
        fetching: false,
        data: {}
    },
    invalid_profile_breakdown: {
        fetched: false,
        fetching: false,
        data: {}
    },
    project_interview_summary: {
        fetched: false,
        fetching: false,
        data: {}
    },
    project_interview_breakdown: {
        fetched: false,
        fetching: false,
        data: {}
    },
    member_interview_summary: {
        fetched: false,
        fetching: false,
        data: {}
    },
    member_interview_breakdown: {
        fetched: false,
        fetching: false,
        data: {}
    }
}

export function statistics(state = _.cloneDeep(initialState), action) {
    const payload = action.payload
    switch (action.type) {
        case 'SET_STATISTICS_ORG_ID': {
            if (state.orgId !== action.orgId) {
                return Object.assign({},
                    _.cloneDeep(initialState),
                    {orgId: action.payload}
                )
            }
            return state
        }
        case 'LOAD_INVALID_PROFILE_SUMMARY': {
            let newState = _.cloneDeep(state)
            newState.invalid_profile_summary.fetched = false
            newState.invalid_profile_summary.fetching = true
            return newState
        }
        case 'LOAD_PROJECT_INTERVIEW_SUMMARY': {
            let newState = _.cloneDeep(state)
            newState.project_interview_summary.fetched = false
            newState.project_interview_summary.fetching = true
            return newState
        }
        case 'LOAD_MEMBER_INTERVIEW_SUMMARY': {
            let newState = _.cloneDeep(state)
            newState.member_interview_summary.fetched = false
            newState.member_interview_summary.fetching = true
            return newState
        }
        case 'LOAD_INVALID_PROFILE_SUMMARY_FULFILLED': {
            let newState = _.cloneDeep(state)
            newState.invalid_profile_summary.fetched = true
            newState.invalid_profile_summary.fetching = false
            newState.invalid_profile_summary.data = (payload.data || {}).data || {}
            return newState
        }
        case 'LOAD_PROJECT_INTERVIEW_SUMMARY_FULFILLED': {
            let newState = _.cloneDeep(state)
            newState.project_interview_summary.fetched = true
            newState.project_interview_summary.fetching = false
            newState.project_interview_summary.data = (payload.data || {}).data || {}
            return newState
        }
        case 'LOAD_MEMBER_INTERVIEW_SUMMARY_FULFILLED': {
            let newState = _.cloneDeep(state)
            newState.member_interview_summary.fetched = true
            newState.member_interview_summary.fetching = false
            newState.member_interview_summary.data = (payload.data || {}).data || {}
            return newState
        }


        case 'LOAD_INVALID_PROFILE_BREAKDOWN': {
            let newState = _.cloneDeep(state)
            newState.invalid_profile_breakdown.fetched = false
            newState.invalid_profile_breakdown.fetching = true
            return newState
        }
        case 'LOAD_PROJECT_INTERVIEW_BREAKDOWN': {
            let newState = _.cloneDeep(state)
            newState.project_interview_breakdown.fetched = false
            newState.project_interview_breakdown.fetching = true
            return newState
        }
        case 'LOAD_MEMBER_INTERVIEW_BREAKDOWN': {
            let newState = _.cloneDeep(state)
            newState.member_interview_breakdown.fetched = false
            newState.member_interview_breakdown.fetching = true
            return newState
        }
        case 'LOAD_INVALID_PROFILE_BREAKDOWN_FULFILLED': {
            let newState = _.cloneDeep(state)
            newState.invalid_profile_breakdown.fetched = true
            newState.invalid_profile_breakdown.fetching = false
            newState.invalid_profile_breakdown.data = (payload.data || {}).data || {}
            return newState
        }
        case 'LOAD_PROJECT_INTERVIEW_BREAKDOWN_FULFILLED': {
            let newState = _.cloneDeep(state)
            newState.project_interview_breakdown.fetched = true
            newState.project_interview_breakdown.fetching = false
            newState.project_interview_breakdown.data = (payload.data || {}).data || {}
            return newState
        }
        case 'LOAD_MEMBER_INTERVIEW_BREAKDOWN_FULFILLED': {
            let newState = _.cloneDeep(state)
            newState.member_interview_breakdown.fetched = true
            newState.member_interview_breakdown.fetching = false
            newState.member_interview_breakdown.data = (payload.data || {}).data || {}
            return newState
        }
    }
    return state
}
