import {MyListOfPage} from '../../common/pages/my_list_of_page'

const pageInfo = MyListOfPage('organizations')
console.log(pageInfo)
const MyOrganizations = pageInfo.page

export default MyOrganizations
export const MyOrganizationsSidebar = pageInfo.sidebar