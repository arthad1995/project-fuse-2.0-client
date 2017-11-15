import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'
import { fromJS } from 'immutable'
import Cookies from 'js-cookie'

const load_handler = async_base('LOAD_USER')

export function user(state = not_loaded, action){
    state = load_handler(state, action)
    switch(action.type){
        case 'REGISTER_PENDING':
            return state.set('fetched', false).set('fetching', true).set('reg_user', fromJS(action.payload))
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
        case 'LOAD_USER_FULFILLED':{
            if(action.payload.data.status === 'OK'){
                let response = action.payload.data.data
                Cookies.set('SESSIONID', response.sessionId, {path: '/'})
                Cookies.set('ID', response.user.id, {path: '/'})
                Cookies.set('NAME', response.user.name, {path: '/'})
                Cookies.set('EMAIL', response.user.email, {path: '/'})
            }
            break;
        }
    }
    return state;
}
