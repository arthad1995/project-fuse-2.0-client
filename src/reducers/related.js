import {async_base, combine_wrapper_nested} from './base_reducers'

export const related = combine_wrapper_nested([
    {
        key: 'projs',
        func: async_base('PROJECTS_FOR_USER')
    },
    {
        key: 'orgs',
        func: async_base('ORGANIZATIONS_FOR_USER'),
    },
    {
        key: 'friends',
        func: async_base('FRIENDS_FOR_USER')
    }
])