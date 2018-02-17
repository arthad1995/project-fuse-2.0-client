import React from 'react'
import {Async} from '../../common'

const Notifications = (props) => <Async load={import('./impl')}  {...props}/>
export default Notifications
