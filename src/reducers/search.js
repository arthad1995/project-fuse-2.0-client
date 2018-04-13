import {async_base, combine_wrapper} from './base_reducers'
import { fromJS } from 'immutable'

export const search = combine_wrapper([
    async_base('GLOBAL_SEARCH_INFO'),
    async_base('SEARCH_PROJECT_INFO'),
    async_base('SEARCH_USERS_INFO'),
    async_base('SEARCH_ORGANIZATION_INFO'),
    (state = fromJS({}), action) => {
        switch(action.type) {
        case 'ADD_ACTION_FOR_RESULT':{
            const items = state.get('data').get('items')
            return state.set('data',
                state.get('data').set('items',
                    items.set(
                        action.payload.result,
                        items
                            .get(action.payload.result)
                            .set('actions_available', action.payload.action)
                    )
                )
            )}
        case 'REMOVE_ACTION_FOR_RESULT':{
            const items = state.get('data').get('items')
            return state.set('data',
                state.get('data').set('items',
                    items.set(
                        action.payload.result,
                        items
                            .get(action.payload.result)
                            .set('actions_available', '')
                    )
                )
            )}
        case 'LOGOUT_FULFILLED':
        case 'LOGOUT_REJECTED':
            return fromJS({})
        default:
            return state
        }
    }
])