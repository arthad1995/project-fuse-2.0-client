import { not_loaded } from './initial_states'
import { async_base } from './base_reducers'
import Cookies from 'js-cookie'

const load_handler = async_base('LOAD_USER')

export function user(state = not_loaded, action){
    state = load_handler(state, action)
    switch(action.type){
        case 'LOGOUT_FULFILLED':
            state = not_loaded
            break;
        case 'LOAD_USER_FULFILLED':{
            console.log(action.payload.data)
            let response = action.payload.data.data
            Cookies.set('SESSIONID', response.sessionId, {path: '/'})
            Cookies.set('NAME', response.name, {path: '/'})
            Cookies.set('EMAIL', response.email, {path: '/'})
            break;
        }
    }
    return state;
}
