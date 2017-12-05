import React from 'react'
import {Async} from '../../common'

const Home = (props) => <Async load={import('./impl')}  {...props}/>
export default Home
export const HomeSidebar = (props) => <Async load={import('./sidebar')}  {...props}/>
