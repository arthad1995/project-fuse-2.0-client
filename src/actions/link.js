import axios from 'axios'

export const addLink = (url, type, tmpId) => {
    return {
        type: 'ADD_LINK_TO_EDIT_OBJ',
        payload: {
            url,
            type,
            tmpId
        }
    }
}

export const loadEditLinkInfoFor = (url, type, id) => {

}

export const deleteLink = (index) => {
    return {
        type: 'DELETE_LINK_AT_INDEX',
        payload: {
            index
        }
    }
}
