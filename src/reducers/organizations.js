import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'

const load_handler = async_base('LOAD_ORGANIZATION_INFO')

export function organizations(state = not_loaded, action){
    return state.merge(load_handler(state, action))
}
