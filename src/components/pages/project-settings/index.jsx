import React, {Component} from 'react'
import { connect } from 'react-redux'
import Sidebar from './sidebar'
import {InterviewTimePicker} from '../../common'

const mapStateToProps = (state) =>{
    return {
    }
}

@connect( mapStateToProps )
class Page extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <div>
                <h2>Interview Settings</h2>
                <InterviewTimePicker onSubmit={state => (vals)=>console.log(vals)} />
            </div>
        )
    }
}

export  const ProjectSettings = Page
export const ProjectSettingsSidebar = Sidebar