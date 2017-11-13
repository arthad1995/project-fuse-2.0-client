import store from '../store'
import axios from "axios"
import config from "../config"
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true

export default class Network {
    constructor(type, host = config.host) {
        this.dispatch = store.dispatch
        this.type = type
        this.host = host
    }

    GET(url, host) {
        host = host || this.host
        this.dispatch({
            type: this.type,
            payload: axios.get(host+ url, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
        })
    }

    PUT(url, data={}, host) {
        host = host || this.host
        this.dispatch({
            type: this.type,
            payload: axios.put(host+ url, data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
        })
    }

    POST(url, data={}, host) {
        host = host || this.host
        this.dispatch({
            type: this.type,
            payload: axios.post(host+ url, data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
        })
    }
    
    DELETE(url, data={}, host) {
        host = host || this.host
        this.dispatch({
            type: this.type,
            payload: axios.delete(host+ url, data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
        })
    }
}
