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

    REGISTER(data, host){
        host = host || this.host
        const login = () =>{
            const network = new Network('LOAD_USER')
            network.POST('/user/login', {
                email,
                password
            })
            let promise = new Promise((resolve)=>resolve())
        }
        let promise = new Promise((resolve)=>resolve())
        this.dispatch((dispatch)=>{
            dispatch({type: 'REGISTER_PENDING', payload: data})
            promise = axios.post(host + '/user/add', data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
                     .then((response)=> Promise.all([
                         dispatch({
                             type: 'REGISTER_FULFILLED',
                             payload: response
                         }),
                         dispatch({
                             type: 'LOAD_USER_PENDING'
                         }),
                         axios.post(host+ '/user/login', data, {withCredentials: true, headers: {'SESSIONID': Cookies.get('SESSIONID')}})
                            .then((response)=>Promise.all([
                                dispatch({
                                    type: 'LOAD_USER_FULFILLED',
                                    payload: response
                                })
                            ]))
                            .catch((response) => dispatch({type: 'LOAD_USER_REJECTED', payload: response}))
                     ]))
                .catch((response) => dispatch({type: 'REGISTER_REJECTED', payload: response}))
        })
        return promise
    }
}
