import {
    fromJS
} from 'immutable'


export const async_base = (base_name) => {
    return (state = not_loaded, action) => {
        switch (action.type) {
            case `${base_name}_PENDING`:
                return state.set('fetching', true).set('fetched', false).remove('errors')
            case `${base_name}_REJECTED`:{
                let response = action.payload.response.data
                if(response.errors)
                    return state.set('fetching', false)
                                            .set('fetched', false)
                                            .set('errors', fromJS(response.errors))
                return state.set('fetching', false)
                    .set('fetched', false)
                    .set('errors', fromJS(response))
            }
            case `${base_name}_FULFILLED`:{
                let response = action.payload.data
                if (response.status === 'OK'){
                    const _state = state.set('fetching', false)
                                            .set('fetched', true)
                    if(Array.isArray(response.data)){
                        let data = {}
                        response.data.forEach((elem)=>{
                            data[elem.id] = elem
                        })
                        return _state.merge(fromJS({data}))
                    }
                    return _state.merge(fromJS({data: response.data}))
                }
                else
                    return state.set('fetching', false)
                        .set('fetched', false)
                        .set('errors', fromJS(response.errors || ["Unable to process your request at this time"]))
            }
            case '@@router/LOCATION_CHANGE':
                if(state.has('errors'))
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
            case `${base_name}_REJECTED`:{
                let response = action.payload.data || action.payload
                if(response.errors)
                    return state.set('fetching', false)
                        .set('fetched', false)
                        .set('errors', fromJS(response.errors))
                return state.set('fetching', false)
                    .set('fetched', false)
                    .set('error', fromJS(response))
            }
            case `${base_name}_FULFILLED`:{
                let response = action.payload.data
                if (response.status === 'OK'){
                    const resObj = {}
                    resObj[response.data.id] = response.data
                    return state.set('fetching', false)
                                            .set('fetched', true)
                                            .merge(fromJS({data: resObj}))
                }
                else
                    return state.set('fetching', false)
                        .set('fetched', false)
                        .set('errors', fromJS(response.errors || ["Unable to process your request at this time"]))
            }
        }
        return state;
    }
}
