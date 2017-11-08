import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'

const load_handler = async_base('LOAD_USER')

export function user(state = not_loaded, action){
    state = load_handler(state, action)
    switch(action.type){
        case 'LOGOUT':
            state = not_loaded
            break;
    }
    return state;
}
