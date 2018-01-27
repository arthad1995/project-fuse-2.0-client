import React, { Component } from 'react'
import {InterviewSettings} from '../../common'
import {addSlotProject} from '../../../actions/interview_settings'
import {updateProject} from '../../../actions/access_settings'
import {AccessSettings} from '../../common'

class Page extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.params && this.props.params.load)
            this.props.params.load(this.props.match.params.id)
    }

    render() {
        return <div>
            <div className="clearfix">
                <InterviewSettings onSubmit={addSlotProject(this.props.match.params.id)} />
            </div>
            <div className="clearfix">
                <AccessSettings onSubmit={updateProject(this.props.match.params.id)} />
            </div>
        </div>
    }
}

export default Page