import Network from '../network'
import {date_format, parse_date} from '../utils/date_utils'
import {loadProjectSettings, loadTeamSettings, loadOrganizationSettings} from './profile_page'

export const addSlotProject = id => values =>{ 
    const network = new Network('ADD_INTERVIEW_SLOT_PROJECT')
    const format = 'MM/DD/YYYY HH:mm a'
    const start = date_format(parse_date(values.datetime__interview_start, format))
    const end = date_format(parse_date(values.datetime__interview_end, format))
    const payload = [{start, end}]
    return network.POST(`/projects/${id}/interview_slots/add`, payload).then(
        ()=>loadProjectSettings(id)
    )
}

export const addSlotTeam = id => values => {
    const network = new Network('ADD_INTERVIEW_SLOT_TEAM')
    return network.POST(`/teams/${id}/interview_slots/add`,{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    })
} 

export const addSlotOrganization = id => values => {
    const network = new Network('ADD_INTERVIEW_SLOT_ORGANIZATION')
    return network.POST(`/organizations/${id}/interview_slots/add`,{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    })
}
