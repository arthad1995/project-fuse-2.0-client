

export function org (state = {}, action) {
    switch(action.type) {
        case 'LOAD_ORGANIZATION_BY_ID_FULFILLED': {
            return Object.assign({},
                state,
                (((action.payload || {}).data || {}).data || {}))
        }
    }
    return state
}
