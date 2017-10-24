import { empty } from './initial_states'

export function ui(state = empty, action){
    switch(action.type){
        case '@@router/LOCATION_CHANGE': // resets tabs on page change
            return state.set('selected_tab', 'tab1')
        case 'CHANGE_TAB':
            return state.set('selected_tab', action.payload)
    }
    return state;
}
