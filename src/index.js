import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import store, {history} from './store'
import Layout from './components/layout'

import mockData from './mock_data'

mockData(store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Layout />
        </Router>
    </Provider>,
    document.getElementById('app')
)
