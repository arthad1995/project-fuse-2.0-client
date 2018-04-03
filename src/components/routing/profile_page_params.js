import Cookies from 'js-cookie'
import { loadUser, loadProject, loadOrganization } from '../../actions/profile_page'
import createArray from './create_array'
import __pages from './__pages'
import {UserCustomElems } from '../pages/user-page'
import {ProjectCustomElems} from '../pages/project-page'
import {OrganizationCustomElems} from '../pages/organization-page'


export default  createArray(__pages, [
    { canEdit: (_, elem) => elem && elem.get('canEdit'), load: loadProject, customElems: ProjectCustomElems },
    { canEdit: (_, elem) => elem && elem.get('canEdit'), load: loadOrganization, customElems: OrganizationCustomElems },
    { canEdit: (_, elem) => elem && elem.get('id') == Cookies.get('ID'), load: loadUser, customElems: UserCustomElems }
])