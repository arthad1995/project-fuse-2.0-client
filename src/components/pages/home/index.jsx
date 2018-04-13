import React from 'react'
import {Async} from '../../common'
import Home from '../notifications'

export default Home
export const HomeSidebar = (props) => <Async load={import('./sidebar')}  {...props}/>
