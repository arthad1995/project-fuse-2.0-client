import {CreatePage, ApplyButton, SearchPage} from '../common'
import { myProjects, myTeams, myOrganizations, myFriends } from '../../actions/my_'
import createArray from './create_array'
import { userTest, orgTest, teamTest, projTest } from './search_apply_testing'
import { addFriend, applyToOrganization, applyToTeam, applyToProject } from '../../actions/apply'
import { searchUsers, searchProjects, searchTeams, searchOrganizations } from '../../actions/search'
import { createProject, createTeam, createOrganization } from '../../actions/create'
import __pages from './__pages'

export default createArray(__pages.slice(0, -1).concat(['friends']), [
    {
        load: myProjects,
        search_tab: (tab) => SearchPage({
            path: 'projects',
            param: { apply: ApplyButton(['user', 'applied_projects', 'user_projects'], projTest, applyToProject), load: searchProjects }
        }),
        new_tab: (tab) => CreatePage({
            path: 'projects',
            param: { name: 'Project', save: createProject },
        })
    },
    {
        load: myTeams,
        search_tab: (tab) => SearchPage({
            path: 'teams',
            param: { apply: ApplyButton(['user', 'applied_teams', 'user_teams'], teamTest, applyToTeam), load: searchTeams },
        }),
        new_tab: (tab) => CreatePage({
            path: 'teams',
            param: { name: 'Team', save: createTeam },
        })
    },
    {
        load: myOrganizations,
        search_tab: (tab) => SearchPage({
            path: 'organizations',
            param: { apply: ApplyButton(['user', 'applied_organizations', 'user_organizations'], orgTest, applyToOrganization), load: searchOrganizations },
        }),
        new_tab: (tab) => CreatePage({
            path: 'organizations',
            param: { name: 'Organization', save: createOrganization }
        })
    },
    {
        load: myFriends,
        show_new: false,
        search_tab: (tab) => SearchPage({
            path: 'friends',
            param: { apply: ApplyButton(['user', 'friends'], userTest, addFriend, 'Add Friend'), load: searchUsers, applicationHeadline: "Friend invite sent!", applicationSummary: "Your friend invite was sent succesfully!" }
        })
    }
]
);