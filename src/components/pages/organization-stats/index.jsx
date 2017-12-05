import React from 'react'
import {Async} from '../../common'

export const OrganizationStatsPage = (props) => <Async load={import('./impl')}  {...props}/>
