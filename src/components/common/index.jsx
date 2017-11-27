import Async from './async'
import React from 'react'

// optimized

export {SearchPage} from './pages/search'
export {CreatePage} from './pages/create'
export {default as AnimationHandler} from './elements/animation'
export {Editor} from './elements/editor'
export {PageShell, SidebarShell} from './shells'
export {ProfilePage} from './pages/profile_page'
export const Card = (props) => <Async load={import('./elements/card')} {...props} />
export const ErrorDisplay = (props) => <Async load={import('./elements/error_display')} {...props} />

//not optimized

export {MyListOfPage} from './pages/my_list_of_page'

export {CreateSidebar} from './sidebars/create'
export {SearchPageSidebar} from './sidebars/search'

export {ApplyButton} from './elements/application'
export {InterviewTimePicker} from './elements/interview_time_picker'
export {default as Async} from './async'
