import { fromJS } from 'immutable'

export function ui(state = fromJS({online: true}), action){
    switch(action.type){
        case '@@router/LOCATION_CHANGE': // resets tabs on page change
            return state.set('selected_tab', 'tab1')
        case 'CHANGE_TAB':
            return state.set('selected_tab', action.payload)
        case 'ONLINE':
            return state.set('online', true)
        case 'OFFLINE':
            return state.set('online', false)
    }
    return state;
}
