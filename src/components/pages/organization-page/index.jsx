import React from 'react'
import {Async} from '../../common'

export const OrganizationPageSidebar = (props) => <Async load={import('./sidebar')} {...props}/>
export const OrganizationProjects = props => <Async load={import('./projects')} {...props} />