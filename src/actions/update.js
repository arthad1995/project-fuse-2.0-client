import Network, {fileUpload} from '../network'
import store from '../store'

export const updateProject = history => id => values =>{
    const network = new Network('UPDATE_PROJECT')
    return network.PUT(`/projects/${id}`,{
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    }).then(()=>history.push(`/projects/${id}`))
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
    return network.PUT(`/organizations/${id}`,{
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    }).then(()=>history.push(`/organizations/${id}`))
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
                promises.push(fileUpload('/users/upload/thumbnail', thumbnail, 'UPLOAD_USER_THUMBNAIL'))
            }
            if(background) {
                promises.push(fileUpload('/users/upload/background', background, 'UPLOAD_USER_BACKGROUND'))
            }
            return Promise.all(promises)
        }
    ).then(() => history.push(`/users/${id}`))
}
