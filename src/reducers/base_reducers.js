import {
    fromJS
} from 'immutable'
import {
    not_loaded
} from './initial_states'

export const async_base = (base_name) => {
    return (state = not_loaded, action) => {
        switch (action.type) {
            case `${base_name}_PENDING`:
                return state.set('fetching', true).set('fetched', false).remove('errors')
            case `${base_name}_REJECTED`:
                {
                    let response = action.payload.response.data
                    if (response.errors)
                        return state.set('fetching', false)
                            .set('fetched', false)
                            .set('errors', fromJS(response.errors))
                    return state.set('fetching', false)
                        .set('fetched', false)
                        .set('errors', fromJS(response))
                }
            case `${base_name}_FULFILLED`:
                {
                    let response = action.payload.data
                    if (response.status === 'OK') {
                        const _state = state.set('fetching', false)
                            .set('fetched', true)
                        if (Array.isArray(response.data)) {
                            let data = {}
                            response.data.forEach((elem) => {
                                data[elem.id] = elem
                            })
                            return _state.merge(fromJS({
                                data
                            }))
                        }
                        return _state.merge(fromJS({
                            data: response.data
                        }))
                    } else
                        return state.set('fetching', false)
                            .set('fetched', false)
                            .set('errors', fromJS(response.errors || ["Unable to process your request at this time"]))
                }
            case '@@router/LOCATION_CHANGE':
                if (state.has('errors'))
                    return state.remove('errors')
        }
        return state;
    }
}

export const async_base_id = (base_name) => {
    return (state = not_loaded, action) => {
        switch (action.type) {
            case `${base_name}_PENDING`:
                return state.set('fetching', true).set('fetched', false)
            case `${base_name}_REJECTED`:
                {
                    let response = action.payload.response.data || action.payload
                    if (response.errors)
                        return state.set('fetching', false)
                            .set('fetched', false)
                            .set('errors', fromJS(response.errors))
                    return state.set('fetching', false)
                        .set('fetched', false)
                        .set('errors', fromJS(response))
                }
            case `${base_name}_FULFILLED`:
                {
                    let response = action.payload.data
                    if (response.status === 'OK') {
                        const resObj = {}
                        resObj[response.data.id] = response.data
                        return state.set('fetching', false)
                            .set('fetched', true)
                            .merge(fromJS({
                                data: resObj
                            }))
                    } else
                        return state.set('fetching', false)
                            .set('fetched', false)
                            .set('errors', fromJS(response.errors || ["Unable to process your request at this time"]))
                }
            case '@@router/LOCATION_CHANGE':
                if (state.has('errors'))
                    return state.remove('errors')
        }
        return state;
    }
}

export const async_base_redirect = (base_name) => {
    return (state = not_loaded, action) => {

    }
}

export const async_get_and_get_by_id = (base_name) => {
    const load_handler_all = async_base(`LOAD_${base_name}_INFO`)
    const load_handler_by_id = async_base_id(`LOAD_${base_name}_BY_ID`)

    return (state = not_loaded, action) => state.merge(load_handler_by_id(load_handler_all(state, action), action))
}

export const async_list_get_and_create = (base_name) => {
    return (state = not_loaded, action) => {
        const handler = async_get_and_get_by_id(base_name)
        state = handler(state, action)
        switch (action.type) {
            case `CREATE_${base_name}_PENDING`:
                return state.set('fetching', true)
                    .set('fetched', false)
            case `CREATE_${base_name}_FULFILLED`:
                {
                    let response = action.payload.data
                    if (response.status === 'OK') {
                        return state.set('fetching', false)
                            .set('fetched', true)
                            .set('REDIRECT_ID', response.data.id)
                    } else
                        return state.set('fetching', false)
                            .set('fetched', false)
                            .set('errors', fromJS(response.errors || ["Unable to process your request at this time"]))
                }
            case `CREATE_${base_name}_REJECTED`:
                {
                    let response = action.payload.response.data || action.payload.response
                    if (response.errors)
                        return state.set('fetching', false)
                                                .set('fetched', false)
                                                .set('errors', fromJS(response.errors))
                    return state.set('fetching', false)
                                            .set('fetched', false)
                                            .set('errors', fromJS(response))
                }
            case '@@router/LOCATION_CHANGE':
                return state.remove('errors')
                    .remove('REDIRECT_ID')
        }
        return state
    }
}