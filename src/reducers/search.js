import {async_base, combine_wrapper} from './base_reducers'

export const search = combine_wrapper([
    async_base('GLOBAL_SEARCH_INFO'),
    async_base('SEARCH_PROJECT_INFO'),
    async_base('SEARCH_USERS_INFO'),
    async_base('SEARCH_ORGANIZATION_INFO'),
])