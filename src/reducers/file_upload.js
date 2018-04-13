import {fromJS} from 'immutable'

export const fileUpload = (state = fromJS({thumbnail: null, background: null}), action) => {
    switch(action.type) {
        case 'SET_THUMBNAIL_UPLOAD': {
            return state.set('thumbnail', action.img)
        }
        case 'SET_BACKGROUND_UPLOAD': {
            return state.set('background', action.img)
        }
        case '@@router/LOCATION_CHANGE': {
            return state.set('thumbnail', null).set('background', null)
        }
        case 'LOGOUT_FULFILLED':
        case 'LOGOUT_REJECTED':
            return fromJS({thumbnail: null, background: null})
    }
    return state
}
