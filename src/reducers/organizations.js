import { not_loaded } from './initial_states'
import { async_get_and_get_by_id } from './base_reducers'

export const organizations = async_get_and_get_by_id('ORGANIZATION')
