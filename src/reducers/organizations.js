import { not_loaded } from './initial_states'
import { async_list_get_and_create } from './base_reducers'

export const organizations = async_list_get_and_create('ORGANIZATION')
export const organization_projects = async_list_get_and_create(`ORGANIZATION_PROJECTS`)
