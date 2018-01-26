import React from 'react'
import {Async} from '../../common'

const Search = (props) => <Async load={import('./impl')}  {...props}/>
export default Search
