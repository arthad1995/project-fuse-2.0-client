import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'

const load_handler = async_base('LOAD_FEED')

export function feed(state = not_loaded, action){
    state = load_handler(state, action)
    return state;
}
