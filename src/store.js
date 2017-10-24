import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {createLogger} from 'redux-logger'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createHashHistory } from 'history'

export const history = createHashHistory()

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(
        createLogger(),
        promise(),
        thunkMiddleware, 
        routerMiddleware(history)
    )
)

export default store
