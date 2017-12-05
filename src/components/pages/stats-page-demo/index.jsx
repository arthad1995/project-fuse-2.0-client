import React from 'react'
import {Async} from '../../common'

const Stats = (props) => <Async load={import('./impl')}  {...props}/>
export default Stats