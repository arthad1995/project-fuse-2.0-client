import { not_loaded } from './initial_states'
import { async_base, append_wrapper } from './base_reducers'

export const user_projects = append_wrapper('JOINED_PROJECT')( async_base('LOAD_MY_PROJECTS'))
