import React from 'react'
import {Async} from '../../common'

export const OrganizationSettings = (params) => (props) => <Async load={import('./impl')}  {...props} params={params}/>
export const OrganizationSettingsSidebar = (props) => <Async load={import('./sidebar')}  {...props}/>
