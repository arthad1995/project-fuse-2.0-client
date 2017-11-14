import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import store, {history} from './store'
import Layout from './components/layout'
import Cookies from 'js-cookie'
import mockData from './mock_data'

mockData(store)


if(Cookies.get('SESSIONID') && Cookies.get('ID') && Cookies.get('EMAIL') && Cookies.get('NAME')){
    store.dispatch(
        {
            type: 'LOAD_USER_FULFILLED',
            payload:{
                data:{
                    status: "OK",
                    errors: null,
                    data:{
                        sessionId: Cookies.get('SESSIONID'),
                        user:{
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

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Layout />
        </Router>
    </Provider>,
    document.getElementById('app')
)
