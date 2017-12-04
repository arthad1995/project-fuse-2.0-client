import { not_loaded } from './initial_states'
import { async_base, append_wrapper } from './base_reducers'

export const scheduled_interviews = async_base('LOAD_SCHEDULED_INTERVIEWS')
