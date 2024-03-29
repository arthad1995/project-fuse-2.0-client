import {CreatePage, ApplyButton, SearchPage} from '../common'
import { myProjects, myTeams, myOrganizations, myFriends } from '../../actions/my_'
import createArray from './create_array'
import { userTest, orgTest, projTest } from './search_apply_testing'
import { addFriend, applyToOrganization, applyToTeam, applyToProject } from '../../actions/apply'
import { searchUsers, searchProjects, searchTeams, searchOrganizations } from '../../actions/search'
import { createProject, createTeam, createOrganization } from '../../actions/create'
import __pages from './__pages'

import { ProjectCustomElemsEdit } from '../pages/project-page';
import { OrganizationCustomElemsEdit } from '../pages/organization-page';

export default createArray(__pages.slice(0, -1).concat(['friends']), [
    {
        load: myProjects,
        search_tab: (tab) => SearchPage({
            path: 'projects',
            param: {
                apply: ApplyButton(['user', 'applied_projects', 'user_projects'], projTest, applyToProject),
                load: searchProjects,
                name: 'SEARCH_PROJECT_INFO'
            }
        }),
        new_tab: (tab) => CreatePage({
            path: 'projects',
            param: { name: 'Project', save: createProject, customElems: ProjectCustomElemsEdit },
        })
    },
    {
        load: myOrganizations,
        search_tab: (tab) => SearchPage({
            path: 'organizations',
            param: {
                apply: ApplyButton(['user', 'applied_organizations', 'user_organizations'], orgTest, applyToOrganization),
                load: searchOrganizations,
                name: 'SEARCH_ORGANIZATION_INFO'
            },
        }),
        new_tab: (tab) => CreatePage({
            path: 'organizations',
            param: { name: 'Organization', save: createOrganization, customElems: OrganizationCustomElemsEdit }
        })
    },
    {
        load: myFriends,
        show_new: false,
        search_tab: (tab) => SearchPage({
            path: 'friends',
            param: {
                apply: ApplyButton(['user', 'friends'], userTest, addFriend, 'Add Friend'),
                load: searchUsers,
                applicationHeadline: "Friend invite sent!",
                applicationSummary: "Your friend invite was sent succesfully!" ,
                name: 'SEARCH_USERS_INFO'
            }
        })
    }
]
);