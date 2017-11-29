import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import store, { history } from './store'
import Layout from './components/layout'
import Cookies from 'js-cookie'
import mockData from './mock_data'

mockData(store.dispatch)

function updateOnlineStatus(event) {
    if (navigator.onLine) {
        store.dispatch({ type: 'ONLINE' })
    } else {
        store.dispatch({ type: 'OFFLINE' })
    }
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()

if (Cookies.get('SESSIONID') && Cookies.get('ID') && Cookies.get('EMAIL') && Cookies.get('NAME')) {
    store.dispatch(
        {
            type: 'LOGIN_FULFILLED',
            payload: {
                data: {
                    status: "OK",
                    errors: null,
                    data: {
                        sessionId: Cookies.get('SESSIONID'),
                        user: {
                            id: Cookies.get('ID'),
                            name: Cookies.get('NAME'),
                            email: Cookies.get('EMAIL')
                        }
                    }
                }
            }
        }
    )
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Layout />
        </Router>
    </Provider>,
    document.getElementById('app')
)
