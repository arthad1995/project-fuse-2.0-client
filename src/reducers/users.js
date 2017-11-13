import { not_loaded } from './initial_states'
import { async_base, async_base_id } from './base_reducers'

const load_handler = async_base('LOAD_USERS_INFO')
const load_handler_2 = async_base_id('LOAD_USER_BY_ID')

export function users(state = not_loaded, action){
    const _state = state.merge(load_handler(state, action))
    return _state.merge(load_handler_2(_state, action))
}
