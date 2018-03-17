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
                promises.push(fileUpload(`/projects/${id}/upload/thumbnail`, thumbnail, 'UPLOAD_PROJ_THUMBNAIL'))
            }
            if(background) {
                promises.push(fileUpload(`/projects/${id}/upload/background`, background, 'UPLOAD_PROJ_BACKGROUND'))
            }
            if (values.profileLinks) {
                promises.push(
                    (new Network('UPDATE_PROJECT_LINKS')).PUT(
                        `/projects/${id}/links`,
                        JSON.parse(values.profileLinks)
                    )
                )
            }

            return Promise.all(promises)
        }
    )
    .then(()=>history.push(`/projects/${id}`))
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
                promises.push(fileUpload(`/organizations/${id}/upload/thumbnail`, thumbnail, 'UPLOAD_ORG_THUMBNAIL'))
            }
            if(background) {
                promises.push(fileUpload(`/organizations/${id}/upload/background`, background, 'UPLOAD_ORG_BACKGROUND'))
            }
            if (values.profileLinks) {
                promises.push(
                    (new Network('UPDATE_ORGANIZATION_LINKS')).PUT(
                        `/organizations/${id}/links`,
                        JSON.parse(values.profileLinks)
                    )
                )
            }

            return Promise.all(promises)
        }
    )
    .then(()=>history.push(`/organizations/${id}`))
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
                promises.push(fileUpload(`/users/upload/thumbnail`, thumbnail, 'UPLOAD_USER_THUMBNAIL')
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
                    }))
            }
            if(background) {
                promises.push(fileUpload(`/users/upload/background`, background, 'UPLOAD_USER_BACKGROUND'))
            }
            if (values.profileLinks) {
                promises.push(
                    (new Network('UPDATE_USER_LINKS')).PUT(
                        `/users/${id}/links`,
                        JSON.parse(values.profileLinks)
                    )
                )
            }

            return Promise.all(promises)
        }
    ).then(() => history.push(`/users/${id}`))
}
