import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown');
import { AnimationHandler } from '../../../common'
import { Map } from 'immutable'
import { Tab, Tabs, TabList, TabPanel } from '../../../common'

class Page extends Component {
    constructor(props) {
        super(props)

        this.tabChange = this.tabChange.bind(this)

        this.state = {
            tabs: [
                "pending",
                "interviewed",
                "interview_scheduled",
                "declined"
            ]
        }
    }

    componentDidMount() {
        if (this.props.load)
            this.props.load(this.props.match.params.id, this.props.ui.get('applicant_tab'))
    }

    tabChange(index, lastIndex, event) {
        if (index === lastIndex) {
            return
        }

        this.props.dispatch({ type: "CHANGE_APPLICANT_TAB", value: this.state.tabs[index] })
        if (this.props.load)
            this.props.load(this.props.match.params.id, this.state.tabs[index])
    }

    showPending(data) {
        return JSON.stringify(data)
    }

    showInterviewed(data) {
        return JSON.stringify(data)
    }

    showInterviewScheduled(data) {
        return JSON.stringify(data)
    }

    showDeclined(data) {
        return JSON.stringify(data)
    }

    render() {
        const params = this.props.match.params
        const data = this.props['applicants'].get('data')
        const editBtn = (this.props.canEdit && this.props.canEdit(this.props, elem) ? <div className='edit-btn'><Link to={`/${this.props.index}/${params.id}/edit`}><i className='fas fa-pencil-alt'></i></Link></div> : '')
        const customElems = this.props.customElems || (e => null)

        return (
            <AnimationHandler anim="SlideInTop" animKey='always'>
                <div className="relative">
                    <Tabs onSelect={this.tabChange} selectedIndex={this.state.tabs.indexOf(this.props.ui.get('applicant_tab'))}>
                        <TabList>
                            <Tab>Pending</Tab>
                            <Tab>Interviewed</Tab>
                            <Tab>Interview Scheduled</Tab>
                            <Tab>Declined</Tab>
                        </TabList>

                        <TabPanel>
                            {this.props['applicants'].get('fetching') ? <div className="loading"></div> : this.showPending(data)}
                        </TabPanel>
                        <TabPanel>
                            {this.props['applicants'].get('fetching') ? <div className="loading"></div> : this.showInterviewed(data)}
                        </TabPanel>
                        <TabPanel>
                            {this.props['applicants'].get('fetching') ? <div className="loading"></div> : this.showInterviewScheduled(data)}
                        </TabPanel>
                        <TabPanel>
                            {this.props['applicants'].get('fetching') ? <div className="loading"></div> : this.showDeclined(data)}
                        </TabPanel>
                    </Tabs>
                </div>
            </AnimationHandler>
        )
    }
}

export default Page