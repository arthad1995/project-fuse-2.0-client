import { not_loaded } from './initial_states'
import { async_base, combine_wrapper } from './base_reducers'
import { fromJS } from 'immutable'

export const cur_user = combine_wrapper([
    async_base('LOAD_CUR_USER_INFO'),
    (state = fromJS({}), action) => {
        switch(action.type) {
            case 'UPDATE_THUMBNAIL_UI': {
                let user = state.get('data') || fromJS({})
                let profile = user.get('profile') || fromJS({})
                profile = profile.set('thumbnail_id', action.val)
                return state.set('data', user.set('profile', profile))
            }
            case 'LOGIN_FULFILLED': {
                let payload = action.payload.data
                if (payload) {
                    let data = payload.data
                    if (data) {
                        let user = data.user
                        state = state.set('data', fromJS(user))
                    }
                }
                return state
            }
            case 'LOGOUT_FULFILLED':
            case 'LOGOUT_REJECTED':
                return fromJS({})
            default: {
                return state
            }
        }
    }
])
