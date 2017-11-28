import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'
const {fromJS} = Immutable
import Cookies from 'js-cookie'

const load_handler = async_base('LOAD_USER')

export function user(state = not_loaded, action){
    state = load_handler(state, action)
    switch(action.type){
        case 'REGISTER_PENDING':
            return state.set('fetched', false).set('fetching', true).set('reg_user', fromJS(action.payload))
        case 'LOGIN_REJECTED':
        case 'REGISTER_REJECTED':{
            state = state.set('fetched', false).set('fetching', false).remove('reg_user')
            let response = action.payload.response.data || action.payload
            if (response.errors)
                return state.set('errors', fromJS(response.errors))
            return state.set('errors', fromJS(response))
        }
        case 'LOGOUT_FULFILLED':
        case 'LOGOUT_REJECTED':
            state = not_loaded
            Cookies.remove('SESSIONID')
            Cookies.remove('ID')
            Cookies.remove('NAME')
            Cookies.remove('EMAIL')
            if('serviceWorker' in navigator){
                navigator.serviceWorker.controller.postMessage("clear-cached-user-data");
            }
            break;
        case 'LOGIN_FULFILLED':{
            const response = action.payload.data
            if (response.status === 'OK') {
                if(response.status === 'OK'){
                    Cookies.set('SESSIONID', response.data.sessionId, {path: '/'})
                    Cookies.set('ID', response.data.user.id, {path: '/'})
                    Cookies.set('NAME', response.data.user.name, {path: '/'})
                    Cookies.set('EMAIL', response.data.user.email, {path: '/'})
                }

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
    }
    return state;
}
