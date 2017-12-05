import React, { Component } from 'react'
import {InterviewSettings} from '../../common'

class Page extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.params && this.props.params.load)
            this.props.params.load(this.props.match.params.id)
    }

    render() {
        return <InterviewSettings />
    }
}

export default Page