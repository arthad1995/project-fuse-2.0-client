import {
    fromJS
} from 'immutable'
import {
    show_time_picker
} from '../actions/ui';

export function ui(state = fromJS({
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
    selected_timeslot: 0
}), action) {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE': // resets tabs on page change
            state = state.set('selected_tab', 'tab1').set('was_offline', false).set('animation', fromJS({
                page: true,
                sidebar: true,
            })).set('show_time_picker', false).set('local_search', '').set('applicant_tab', 'pending')
            .set('show_interview_slots', false).set('selected_timeslot', 0)
            if (action.payload.pathname !== '/search') {
                state = state.set('global_search', fromJS({
                    show: false,
                    search: ''
                }))
            }
            return state
        case 'CHANGE_TAB':
            return state.set('selected_tab', action.payload)
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
            return state.set('mock_data', 0)
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
        case 'HIDE_INTERVIEW_SLOTS':
            return state.set('show_interview_slots', false)
        case 'SELECT_TIMESLOT':
            return state.set('selected_timeslot', action.value)
    }
    if (action.type.match(/ADD_INTERVIEW_SLOT_.+_FULFILLED/)) {
        state = state.set('show_time_picker', false)
    }
    return state;
}