import {fromJS} from 'immutable'

export function ui(state = fromJS({online: true, show_time_picker: false, 'animation': {page: true, sidebar: true}, mock_data: 0}), action){
    switch(action.type){
        case '@@router/LOCATION_CHANGE': // resets tabs on page change
            return state.set('selected_tab', 'tab1').set('was_offline', false).set('animation', fromJS({
                page: true,
                sidebar: true,
            })).set('show_time_picker', false)
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
        case 'LOGOUT_FULFILLED':
        case 'LOGOUT_REJECTED':
            return state.set('mock_data', 0)
    }
    return state;
}
