const {fromJS} = Immutable

export const not_loaded = fromJS({
    fetched: false,
    fetching: false
})

export const empty = fromJS({})
