import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {createLogger} from 'redux-logger'
import { routerReducer, routerMiddleware , syncHistoryWithStore} from 'react-router-redux'
import { createHashHistory } from 'history'
import { reducer as formReducer } from 'redux-form'

export const history = createHashHistory()

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer,
        form: formReducer
    }),
    applyMiddleware(
        createLogger(),
        promise(),
        thunkMiddleware,
        routerMiddleware(history)
    )
)

export var syncedHistory = syncHistoryWithStore(history, store)

export default store
