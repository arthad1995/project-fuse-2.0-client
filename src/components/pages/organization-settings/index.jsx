import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './sidebar'
import { InterviewTimePicker } from '../../common'

const mapStateToProps = (state) => {
    return {
    }
}

const page_generator = (paramObj) => {

    @connect(mapStateToProps)
    class Page extends Component {
        constructor(props) { super(props) }

        componentDidMount() {
            if (this.props.load)
                this.props.load(this.props.match.params.id)
            else if (paramObj.param && paramObj.param.load)
                paramObj.param.load(this.props.match.params.id)
            else if(paramObj.load)
            paramObj.load(this.props.match.params.id)
        }

        render() {
            return (
                <div>
                    <h2>Interview Settings</h2>
                    <InterviewTimePicker onSubmit={state => (vals) => console.log(vals)} />
                </div>
            )
        }
    }
    return Page
}

export const OrganizationSettings = page_generator
export const OrganizationSettingsSidebar = Sidebar