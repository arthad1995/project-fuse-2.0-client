import Network, {fileUpload} from '../network'
import store from '../store'

export const updateProject = history => id => values =>{
    const network = new Network('UPDATE_PROJECT')
    const thumbnail = store.getState().fileUpload.get('thumbnail')
    const background = store.getState().fileUpload.get('background')
    return network.PUT(`/projects/${id}`,{
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    }).then(
        () => {
            let promises = []
            if(thumbnail) {
                return fileUpload(`/projects/${id}/upload/thumbnail`, thumbnail, 'UPLOAD_PROJ_THUMBNAIL')
            } else {
                return Promise.resolve()
            }
        }
    ).then(
        () => {
            if(background) {
                return fileUpload(`/projects/${id}/upload/background`, background, 'UPLOAD_PROJ_BACKGROUND')
            } else {
                return Promise.resolve()
            }
        }
    ).then(()=>history.push(`/projects/${id}`))
}

export const updateTeam = history => id => values => {
    const network = new Network('UPDATE_TEAM')
    return network.PUT(`/teams/${id}`,{
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    }).then(()=>history.push(`/teams/${id}`))
}

export const updateOrganization = history => id => values => {
    const network = new Network('UPDATE_ORGANIZATION')
    const thumbnail = store.getState().fileUpload.get('thumbnail')
    const background = store.getState().fileUpload.get('background')
    return network.PUT(`/organizations/${id}`,{
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    }).then(
        () => {
            let promises = []
            if(thumbnail) {
                return fileUpload(`/organizations/${id}/upload/thumbnail`, thumbnail, 'UPLOAD_ORG_THUMBNAIL')
            } else {
                return Promise.resolve()
            }
        }
    ).then(
        () => {
            if(background) {
                return fileUpload(`/organizations/${id}/upload/background`, background, 'UPLOAD_ORG_BACKGROUND')
            } else {
                return Promise.resolve()
            }
        }
    ).then(()=>history.push(`/organizations/${id}`))
}

export const updateCurrentUser = history => id => values => {
    const network = new Network('UPDATE_USER')
    const thumbnail = store.getState().fileUpload.get('thumbnail')
    const background = store.getState().fileUpload.get('background')
    return network.PUT(`/users/${id}`, {
        profile:{
            headline: values.headline,
            summary: values.summary,
            skills: values.skills
        }
    }).then(
        () => {
            let promises = []
            if(thumbnail) {
                return fileUpload(`/users/upload/thumbnail`, thumbnail, 'UPLOAD_USER_THUMBNAIL')
                    .then(response => {
                        if (response.data) {
                            response = response.data
                            if (response.data) {
                                response = response.data
                                if (response.id) {
                                    store.dispatch({type: 'UPDATE_THUMBNAIL_UI', val: response.id})
                                }
                            }
                        }
                    })
            } else {
                return Promise.resolve()
            }
        }
    ).then(
        () => {
            if(background) {
                return fileUpload(`/users/upload/background`, background, 'UPLOAD_USER_BACKGROUND')
            } else {
                return Promise.resolve()
            }
        }
    ).then(() => history.push(`/users/${id}`))
}
