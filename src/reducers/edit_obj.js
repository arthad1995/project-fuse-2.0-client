import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'
import {fromJS} from 'immutable'

export function edit_obj(state = fromJS({}), action){

    const isFulfilled = /LOAD\_[A-Z_]+\ID_FULFILLED/;
    const isLoading = /LOAD\_[A-Z_]+\ID_PENDING/

    if(action.type === '@@router/LOCATION_CHANGE') {
        return {}
    }

    if(action.type.match(isFulfilled)){
        let data = action.payload.data.data
        if(data.profile)
            data = Object.assign({}, data, data.profile)
        return Object.assign({}, data)
    }

    if(action.type.match(isLoading)){
        return {loading: true}
    }

    const profile = state.profile
    if(action.type === 'ADD_LINK_TO_EDIT_OBJ') {
        const newProfile = Object.assign(
            {},
            profile,
            {
                links: profile.links.concat([{
                    name: action.payload.type,
                    link: action.payload.url,
                    tmpId: action.payload.tmpId
                }])
            }
        )
        return Object.assign(
            {},
            state,
            {
                profile: newProfile
            }
        )
    }

    if (action.type === 'DELETE_LINK_AT_INDEX') {
        let newLinks = profile.links.slice(0)
        newLinks.splice(action.payload.index, 1)
        const newProfile = Object.assign(
            {},
            profile,
            {
                links: newLinks
            }
        )
        return Object.assign(
            {},
            state,
            {
                profile: newProfile
            }
        )
    }

    return state
}
