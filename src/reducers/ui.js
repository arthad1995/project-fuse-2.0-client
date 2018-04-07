import {
    fromJS
} from 'immutable'
import {
    show_time_picker
} from '../actions/ui';

const baseState = fromJS({
    online: true,
    show_time_picker: false,
    animation: {
        page: true,
        sidebar: true
    },
    global_search: {
        show: false,
        search: ''
    },
    local_search: '',
    mock_data: 0,
    applicant_tab: 'pending',
    show_interview_slots: false,
    selected_timeslot: 0,
    invite_info: null,
    sub_tab: "all",
    last_search_page: '',
    organization_search: '',
    project_search: '',
    user_search: ''
})

export function ui(state = baseState, action) {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE': // resets tabs on page change
            state = state.set('selected_tab', 'tab1').set('was_offline', false).set('animation', fromJS({
                page: true,
                sidebar: true,
            })).set('show_time_picker', false).set('applicant_tab', 'pending')
            .set('show_interview_slots', false).set('selected_timeslot', 0).set('invite_info', null).set('sub_tab', "all")
            if (action.payload.pathname !== '/search') {
                state = state.set('global_search', fromJS({
                    show: false,
                    search: state.get('global_search').get('search')
                }))
            }

            const resetLocalSearch = ['/my-friends', '/my-projects', '/my-organizations']
            if (resetLocalSearch.indexOf(action.payload.pathname) !== -1 && state.get('last_search_page') !== action.payload.pathname) {
                const search = state.get('local_search')
                const lastSearchPage = state.get('last_search_page')
                if (lastSearchPage === '/my-friends') {
                    state = state.set('user_search', search)
                } else if (lastSearchPage === '/my-projects') {
                    state = state.set('project_search', search)
                } else if (lastSearchPage === '/my-organizations') {
                    state = state.set('organization_search', search)
                }
                if (action.payload.pathname === '/my-friends') {
                    state = state.set('local_search', state.get('user_search'))
                } else if (action.payload.pathname === '/my-projects') {
                    state = state.set('local_search', state.get('project_search'))
                } else {
                    state = state.set('local_search', state.get('organization_search'))
                }
                state = state.set('last_search_page', action.payload.pathname)
            }
            return state
        case 'CHANGE_TAB':
            return state.set('selected_tab', action.payload)
        case 'CHANGE_SUB_TAB':
            return state.set('sub_tab', action.value)
        case 'ONLINE':
            return state.set('online', true)
        case 'OFFLINE':
            return state.set('online', false).set('was_offline', true)
        case 'SHOW_TIME_PICKER':
            return state.set('show_time_picker', true)
        case 'HIDE_TIME_PICKER':
            return state.set('show_time_picker', false)
        case 'SET_MOCK_DATA_DISPLAY':
            return state.set('mock_data', action.payload)
        case 'SET_MOCK_DATA_TIME':
            return state.set('mock_data_time', action.payload)
        case 'LOGOUT_FULFILLED':
        case 'LOGOUT_REJECTED':
            return baseState
        case 'TOGGLE_GLOBAL_SEARCH':
            return state.set('global_search',
                state.get('global_search').set('show', !state.get('global_search').get('show'))
            )
        case 'CHANGE_LOCAL_SEARCH_TEXT':
            return state.set('local_search', action.search_text)
        case 'CHANGE_GLOBAL_SEARCH_TEXT':
            return state.set('global_search',
                state.get('global_search').set('search', action.search_text)
        )
        case 'CHANGE_APPLICANT_TAB':
            return state.set('applicant_tab', action.value)
        case 'SHOW_INTERVIEW_SLOTS':
            return state.set('show_interview_slots', true)
        case 'LOAD_INTERVIEW_SLOTS_PENDING':
        case 'LOAD_INTERVIEW_SLOTS_FULFILLED':
            return state.set('selected_timeslot', 0)
        case 'HIDE_INTERVIEW_SLOTS':
            return state.set('show_interview_slots', false)
        case 'SELECT_TIMESLOT':
            return state.set('selected_timeslot', action.value)
        case 'SET_INVITE_INFO':
            return state.set('invite_info', fromJS(action.value))
    }
    if (action.type.match(/ADD_INTERVIEW_SLOT_.+_FULFILLED/)) {
        state = state.set('show_time_picker', false)
    }
    return state;
}