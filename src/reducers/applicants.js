import { not_loaded } from './initial_states'
import { async_base, reset_on_page_reloc, combine_wrapper } from './base_reducers'

export const applicants = reset_on_page_reloc(combine_wrapper([async_base('LOAD_PROJECT_APPLICANTS'),async_base('LOAD_ORGANIZATION_APPLICANTS')]))
