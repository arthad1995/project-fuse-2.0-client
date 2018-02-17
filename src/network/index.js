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
        const request = axios.get(host+ url, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
        this.dispatch({
            type: this.type,
            payload: request
        })
        return request
    }

    PUT(url, data={}, host) {
        host = host || this.host
        const request = axios.put(host+ url, data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
        this.dispatch({
            type: this.type,
            payload: request
        })
        return request
    }

    POST(url, data={}, host) {
        host = host || this.host
        const request = axios.post(host+ url, data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
        this.dispatch({
            type: this.type,
            payload: request
        })
        return request
    }

    DELETE(url, data={}, host) {
        host = host || this.host
        const request = axios.delete(host+ url, data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
        this.dispatch({
            type: this.type,
            payload: request
        })
        return request
    }

    REGISTER(data, host){
        host = host || this.host
        const login = () =>{
            const network = new Network('LOGIN')
            network.POST('/users/login', {
                email,
                password
            })
            let promise = new Promise((resolve)=>resolve())
        }
        let promise = new Promise((resolve)=>resolve())
        this.dispatch((dispatch)=>{
            dispatch({type: 'REGISTER_PENDING', payload: data})
            promise = axios.post(host + '/users', data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
                     .then((response)=> Promise.all([
                         dispatch({
                             type: 'REGISTER_FULFILLED',
                             payload: response
                         }),
                         dispatch({
                             type: 'LOGIN_PENDING'
                         }),
                         axios.post(host+ '/users/login', data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
                            .then((response)=>Promise.all([
                                dispatch({
                                    type: 'LOGIN_FULFILLED',
                                    payload: response
                                })
                            ]))
                            .catch((response) => dispatch({type: 'LOGIN_REJECTED', payload: response}))
                     ]))
                .catch((response) => dispatch({type: 'REGISTER_REJECTED', payload: response}))
        })
        return promise
    }
}

export const fileUpload = (url, file, action_prefix = 'FILE_UPLOAD', host = config.host) => {
    store.dispatch({type: `${action_prefix}_PENDING`})
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'SESSIONID': Cookies.get('SESSIONID')
        }
    }
    return  axios.post(host + url, formData,config)
        .then(response => {
            store.dispatch({type: `${action_prefix}_FULFILLED`, payload: response})
            return response
        })
        .catch(response => {
            store.dispatch({type: `${action_prefix}_REJECTED`, payload: response})
        })
}
