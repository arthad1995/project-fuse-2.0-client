import {fromJS} from 'immutable'

export const not_loaded = fromJS({
    fetched: false,
    fetching: false,
    page: 0,
    pageSize: 15,
})

export const empty = fromJS({})
