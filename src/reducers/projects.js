import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'

const load_handler = async_base('LOAD_PROJECT_INFO')

export function projects(state = not_loaded, action){
    return state.merge(load_handler(state, action))
}
