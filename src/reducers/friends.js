import {not_loaded} from './initial_states'
import {async_base, append_wrapper} from './base_reducers'
import {fromJS} from 'immutable'
import Cookies from 'js-cookie'

export const friends = append_wrapper("ADD_FRIEND")(async_base('LOAD_FRIENDS'))