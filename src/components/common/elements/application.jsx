import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { mapMultKeys } from '../mapping_helpers'
import { stopEvent } from './stopEvent'
import {connect} from 'react-redux'

export const ApplyButton = (keys, testFunc, callback = ()=>{}, text="Apply") => (elem, dispatch) => {
    @connect(mapMultKeys(keys))
    class Button extends Component {
        constructor(props) {
            super(props)
        }

        render() {
            if(!testFunc(this.props, elem))
                return null
            return (
                <div onClick={(e) => { stopEvent(e); callback(elem, dispatch); document.getElementById(`popup`).classList.add('show'); return false; }} className="btn tone1-1-color apply">{text}</div>
            )
        }
    }
    return Button
}
