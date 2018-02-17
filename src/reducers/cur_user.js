import { not_loaded } from './initial_states'
import { async_base, append_wrapper } from './base_reducers'

export const cur_user = async_base('LOAD_CUR_USER_INFO')
