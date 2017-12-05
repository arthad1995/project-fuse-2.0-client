import { not_loaded } from './initial_states'
import { async_base, append_wrapper } from './base_reducers'

export const applied_organizations = append_wrapper("APPLY_TO_ORGANIZATION")(async_base('LOAD_APPLIED_ORGANIZATIONS'))
