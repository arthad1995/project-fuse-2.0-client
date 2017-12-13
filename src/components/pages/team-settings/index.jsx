import React from 'react'
import {Async} from '../../common'

export const TeamSettings = (params) => (props) => <Async load={import('./impl')}  {...props} params={params}/>
