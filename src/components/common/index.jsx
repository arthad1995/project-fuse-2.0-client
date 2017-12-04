import Async from './async'
import React from 'react'

export {PageShell, SidebarShell} from './shells'

export {ProfilePage} from './pages/profile_page'
export {SearchPage} from './pages/search'
export {CreatePage} from './pages/create'
export {MyListOfPage} from './pages/my_list_of_page'

export {CreateSidebar} from './sidebars/create'
export {SearchPageSidebar} from './sidebars/search'

export {default as AnimationHandler} from './elements/animation'
export {Editor} from './elements/editor'
export {ApplyButton} from './elements/application'
export const Card = (props) => <Async load={import('./elements/card')} {...props} />
export const ErrorDisplay = (props) => <Async load={import('./elements/error_display')} {...props} ><div></div></Async>
export const InterviewSettings = (props) => <Async load={import('./elements/interview_settings')} {...props} />

export {default as Async} from './async'

export {Tab, Tabs, TabList, TabPanel} from './elements/react-tabs'
