import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { mapMultKeys } from '../mapping_helpers'
import { stopEvent } from './stopEvent'
import {connect} from 'react-redux'

export const ApplyButton = (keys, testFunc, callback = ()=>{}) => (elem, dispatch) => {
    @connect(mapMultKeys(keys))
    class Button extends Component {
        constructor(props) {
            super(props)
        }

        render() {
            const text = testFunc(this.props, elem)
            if(!text)
                return null
            return (
                <div onClick={(e) => { stopEvent(e); console.log(callback); callback(elem, dispatch); return false; }} className="btn tone1-1-color apply">{text}</div>
            )
        }
    }
    return Button
}
