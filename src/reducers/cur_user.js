import { not_loaded } from './initial_states'
import { async_base, combine_wrapper } from './base_reducers'
import { fromJS } from 'immutable'

export const cur_user = combine_wrapper([
    async_base('LOAD_CUR_USER_INFO'),
    (state = fromJS({}), action) => {
        if (action.type === 'UPDATE_THUMBNAIL_UI') {
            let user = state.get('data') || fromJS({})
            let profile = user.get('profile') || fromJS({})
            profile = profile.set('thumbnail_id', action.val)
            return state.set('data', user.set('profile', profile))
        }
        return state
    }
])
