import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './sidebar'
import { InterviewTimePicker } from '../../common'

const mapStateToProps = (state) => {
    return {
    }
}


@connect(mapStateToProps)
class Page extends Component {
    constructor(props) { super(props) }

    componentDidMount() {
        if (this.props.params && this.props.params.load)
            this.props.params.load(this.props.match.params.id)
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

export default Page