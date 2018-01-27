import Network from '../network'
import {date_format, parse_date} from '../utils/date_utils'
import {loadProject, loadOrganization} from './profile_page'

export const updateProject = id => values => {
    const network = new Network('UPDATE_PROJECT_SETTINGS')
    return network.PUT(`/projects/${id}`, values).then(
        ()=>loadProject(id)
    )
}
export const updateOrganization = id => values => {
    const network = new Network('UPDATE_ORGANIZATION_SETTINGS')
    return network.PUT(`/organizations/${id}`, values).then(
        ()=>loadOrganization(id)
    )
}
