import Network from '../network'
import {date_format} from '../utils/date_utils'

export const addSlotProject = id => values =>{ 
    const network = new Network('ADD_INTERVIEW_SLOT_PROJECT')
    console.log(values);
    const startDateTime = date_format(values.datetime__interview_start)
    const endDateTime = date_format(values.datetime__interview_end)
    network.POST(`/projects/${id}/interview_slots/add`,[{
        startDateTime,
        endDateTime
    }])
}

export const addSlotTeam = id => values => {
    const network = new Network('ADD_INTERVIEW_SLOT_TEAM')
    network.POST(`/teams/${id}/interview_slots/add`,{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    })
} 

export const addSlotOrganization = id => values => {
    const network = new Network('ADD_INTERVIEW_SLOT_ORGANIZATION')
    network.POST(`/organizations/${id}/interview_slots/add`,{
        name: values.name,
        profile:{
            headline: values.headline,
            summary: values.summary
        }
    })
}
