import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'
import {fromJS} from 'immutable'

export function edit_obj_settings(state = {}, action){

    const isFulfilled = /LOAD\_[A-Z_]+\_SETTINGS_FULFILLED/;
    const isLoading = /LOAD\_[A-Z_]+\_SETTINGS_PENDING/

    if(action.type === '@@router/LOCATION_CHANGE'){
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

    return state
}
