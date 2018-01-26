import createArray from './create_array'
import __pages from './__pages'
import { updateProject, updateTeam, updateOrganization, updateCurrentUser } from '../../actions/update'
import { loadUser, loadProject, loadTeam, loadOrganization, loadProjectSettings, loadTeamSettings, loadOrganizationSettings } from '../../actions/profile_page'
import { loadProjectMembers, loadTeamMembers, loadOrganizationMembers } from '../../actions/members'
import { UserCustomElemsEdit } from '../pages/user-page'
import {ProjectSettings } from '../pages/project-settings'
import {TeamSettings} from '../pages/team-settings'
import {OrganizationSettings} from '../pages/organization-settings'

export default {
    edit: createArray(__pages, [
        { name: 'Project', save: updateProject, load: loadProject },
        { name: 'Team', save: updateTeam, load: loadTeam },
        { name: 'Organization', save: updateOrganization, load: loadOrganization },
        { name: 'Profile', save: updateCurrentUser, load: loadUser, customElems: UserCustomElemsEdit },
    ]),
    members: createArray(__pages.slice(0, -1), [
        { load: loadProjectMembers },
        { load: loadTeamMembers },
        { load: loadOrganizationMembers }
    ]),
    settings: createArray(__pages.slice(0, -1), [
        { load: loadProjectSettings, component: ProjectSettings },
        { load: loadTeamSettings, component: TeamSettings },
        { load: loadOrganizationSettings, component: OrganizationSettings }
    ])
}