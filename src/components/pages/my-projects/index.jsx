import {MyListOfPage} from '../../common/pages/my_list_of_page'

const pageInfo = MyListOfPage('projects')
const MyProjects = pageInfo.page

export default MyProjects
export const MyProjectsSidebar = pageInfo.sidebar