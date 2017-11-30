import { not_loaded } from './initial_states'
import { async_base, append_wrapper } from './base_reducers'

export const applied_teams = append_wrapper("APPLY_TO_TEAM")(async_base('LOAD_APPLIED_TEAMS'))
