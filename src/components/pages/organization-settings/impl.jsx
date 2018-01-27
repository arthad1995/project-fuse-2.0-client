import React, { Component } from 'react'
import {InterviewSettings} from '../../common'
import {AccessSettings} from '../../common'
import {addSlotOrganization} from '../../../actions/interview_settings'
import {updateOrganization} from '../../../actions/access_settings'

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
                <InterviewSettings onSubmit={addSlotOrganization(this.props.match.params.id)} />
            </div>
            <div className="clearfix">
                <AccessSettings
                onSubmit={updateOrganization(this.props.match.params.id)}/>
            </div>
        </div>
    }
}

export default Page