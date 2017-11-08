import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class Sidebar extends Component {
    constructor(props){ super(props)}

    render(){
        return <div>
            <div className="section centered">
                Create Organization
            </div>
        </div>
    }
}

Sidebar.goTop = true;

export default Sidebar
