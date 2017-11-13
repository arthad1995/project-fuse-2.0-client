import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'
import Cookies from 'js-cookie'

const load_handler = async_base('LOAD_USER')

export function user(state = not_loaded, action){
    state = load_handler(state, action)
    switch(action.type){
        case 'LOGOUT_FULFILLED':
            state = not_loaded
            Cookies.remove('SESSIONID')
            Cookies.remove('ID')
            Cookies.remove('NAME')
            Cookies.remove('EMAIL')
            break;
        case 'LOAD_USER_FULFILLED':{
            if(action.payload.data.status === 'OK'){
                let response = action.payload.data.data
                Cookies.set('SESSIONID', response.sessionId, {path: '/'})
                Cookies.set('ID', response.id, {path: '/'})
                Cookies.set('NAME', response.name, {path: '/'})
                Cookies.set('EMAIL', response.email, {path: '/'})
            }
            break;
        }
    }
    return state;
}
