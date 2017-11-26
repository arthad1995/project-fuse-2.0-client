import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { mapSingleKey } from '../mapping_helpers'
const ReactMarkdown = require('react-markdown');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { stopEvent } from './stopEvent'

export const ApplyButton = key => (elem, dispatch) => {
    class Button extends Component {
        constructor(props) {
            super(props)
        }

        render() {
            const callback = this.props.callback || function(){}
            return (
                <div onClick={(e) => { stopEvent(e); callback(elem); document.getElementById(`popup`).classList.add('show'); return false; }} className="btn green-color apply">Apply</div>
            )
        }
    }
    return Button
}