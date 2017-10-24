import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

export default class Menu extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <div className="header">
                <Link to="/">Home</Link>
            </div>
        )
    }
}
