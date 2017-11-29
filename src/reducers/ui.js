import {fromJS} from 'immutable'

export function ui(state = fromJS({online: true, show_time_picker: false, 'animation': {page: true, sidebar: true}}), action){
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
    }
    return state;
}
