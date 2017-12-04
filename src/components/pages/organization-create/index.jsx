import {Async} from '../../common'

export const OrganizationCreateSidebar = (props) => <Async load={import('./sidebar')}  {...props}/>