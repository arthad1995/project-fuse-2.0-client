import { applyMiddleware, combineReducers } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {createLogger} from 'redux-logger'
import { routerReducer, routerMiddleware , syncHistoryWithStore} from 'react-router-redux'
import { createHashHistory } from 'history'
import {createStore} from 'redux-async-reducer'

export const history = createHashHistory()

const store = createStore(
    {
        ...reducers,
        routing: routerReducer
    },
    applyMiddleware(
        createLogger(),
        promise(),
        thunkMiddleware,
        routerMiddleware(history)
    )
)

import('redux-form').then((redux_form)=>{
    store.addReducer('form', redux_form.reducer)
})

export var syncedHistory = syncHistoryWithStore(history, store)

export default store
