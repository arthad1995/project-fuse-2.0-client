import React, { Component } from 'react'
import {InterviewSettings} from '../../common'
import {addSlotProject} from '../../../actions/interview_settings'

class Page extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.params && this.props.params.load)
            this.props.params.load(this.props.match.params.id)
    }

    render() {
        return <InterviewSettings onSubmit={addSlotProject(this.props.match.params.id)} />
    }
}

export default Page