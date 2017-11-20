import { not_loaded } from './initial_states'
import { async_list_get_and_create } from './base_reducers'

export const teams = async_list_get_and_create('TEAM')
