import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown');
import { AnimationHandler } from '../../../common'
import { Map } from 'immutable'
import { Tab, Tabs, TabList, TabPanel } from '../../../common'
import {stopEvent} from '../../../common'

const stopEventWrapper = (e, func) => {
    stopEvent(e)
    return func
}

class Page extends Component {
    constructor(props) {
        super(props)

        this.tabChange = this.tabChange.bind(this)
        this.reload = this.reload.bind(this)
        this.decline = this.decline.bind(this)
        this.schedInterview = this.schedInterview.bind(this)
        this.inviteToJoin = this.inviteToJoin.bind(this)

        this.state = {
            tabs: [
                "pending",
                "interview_scheduled",
                "interviewed",
                "declined"
            ]
        }
    }

    reload() {
        if (this.props.load)
            this.props.load(this.props.match.params.id, this.props.ui.get('applicant_tab'))
    }

    decline(elem) { 
        console.log(elem)
    }

    schedInterview(elem) {}
    inviteToJoin(elem) {}
    cancelInterview(elem) {}

    componentDidMount() {
        this.reload()
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
        return data ? <ul>{data.valueSeq().toArray().map((elem, index) => {
            const decline = ((e) => stopEventWrapper(e,this.decline(elem))).bind(this)
            const inviteToJoin = ((e) => stopEventWrapper(e,this.inviteToJoin(elem))).bind(this)
            const schedInterview = ((e) => stopEventWrapper(e,this.schedInterview(elem))).bind(this)
            const sender = elem.get('sender') || fromJS({})
            const profile = sender.get('profile')
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        <div className="name">{sender.get('name')}</div>
                        <div className="email">{sender.get('email')}</div>
                        {profile?
                            <div className="applicant_profile">
                                <div className="headline">
                                    {profile.get('headline')}
                                </div>
                                <div className="summary">
                                    {profile.get('summary')}
                                </div>
                            {(profile.get('skills').length) ?
                            <div className="skills">
                                <ul>
                                    {profile.get('skills').split(',').map((skill, i) => {
                                        return <li key={`${index}_${i}`}>{skill}</li>
                                    })}
                                </ul>
                            </div>
                            : <div className="skills"><i>No Skills Listed</i></div>}
                            <div className='btn tone1-1-color' onClick={schedInterview}>Interview</div>
                            <div className='btn tone1-1-color' onClick={inviteToJoin}>Invite</div>
                            <div className='btn tone1-2-color'>View</div>
                            <div className='btn tone2-3-color' onClick={decline}>Decline</div>
                            </div>
                            : ''}
                    </li>
                </Link>
            )
        })}</ul> : <h2>No pending applications</h2>
    }

    showInterviewed(data) {
        return data ? <ul>{data.valueSeq().toArray().map((elem, index) => {
            const decline = ((e) => stopEventWrapper(e,this.decline(elem))).bind(this)
            const inviteToJoin = ((e) => stopEventWrapper(e,this.inviteToJoin(elem))).bind(this)
            const schedInterview = ((e) => stopEventWrapper(e,this.schedInterview(elem))).bind(this)
            const sender = elem.get('sender') || fromJS({})
            const profile = sender.get('profile')
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        <div className="name">{sender.get('name')}</div>
                        <div className="email">{sender.get('email')}</div>
                        {profile?
                            <div className="applicant_profile">
                                <div className="headline">
                                    {profile.get('headline')}
                                </div>
                                <div className="summary">
                                    {profile.get('summary')}
                                </div>
                            {(profile.get('skills').length) ?
                            <div className="skills">
                                <ul>
                                    {profile.get('skills').split(',').map((skill, i) => {
                                        return <li key={`${index}_${i}`}>{skill}</li>
                                    })}
                                </ul>
                            </div>
                            : <div className="skills"><i>No Skills Listed</i></div>}
                            <div className='btn tone1-1-color' onClick={inviteToJoin}>Invite</div>
                            <div className='btn tone1-2-color'>View</div>
                            <div className='btn tone1-1-color' onClick={schedInterview}>Reinterview</div>
                            <div className='btn tone2-3-color' onClick={decline}>Decline</div>
                            </div>
                            : ''}
                    </li>
                </Link>
            )
        })}</ul> : <h2>No interviewed applicants</h2>
    }

    showInterviewScheduled(data) {
        return data ? <ul>{data.valueSeq().toArray().map((elem, index) => {
            const cancelInterview = ((e) => stopEventWrapper(e,this.cancelInterview(elem))).bind(this)
            const sender = elem.get('sender') || fromJS({})
            const profile = sender.get('profile')
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        <div className="name">{sender.get('name')}</div>
                        <div className="email">{sender.get('email')}</div>
                        {profile?
                            <div className="applicant_profile">
                                <div className="headline">
                                    {profile.get('headline')}
                                </div>
                                <div className="summary">
                                    {profile.get('summary')}
                                </div>
                            {(profile.get('skills').length) ?
                            <div className="skills">
                                <ul>
                                    {profile.get('skills').split(',').map((skill, i) => {
                                        return <li key={`${index}_${i}`}>{skill}</li>
                                    })}
                                </ul>
                            </div>
                            : <div className="skills"><i>No Skills Listed</i></div>}
                            <div className='btn tone1-2-color'>View</div>
                            <div className='btn tone2-3-color' onClick={cancelInterview}>Cancel Interview</div>
                            </div>
                            : ''}
                    </li>
                </Link>
            )
        })}</ul> : <h2>No pending applications</h2>
    }

    showDeclined(data) {
        return data ? <ul>{data.valueSeq().toArray().map((elem, index) => {
            const sender = elem.get('sender') || fromJS({})
            const profile = sender.get('profile')
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        <div className="name">{sender.get('name')}</div>
                        <div className="email">{sender.get('email')}</div>
                        {profile?
                            <div className="applicant_profile">
                                <div className="headline">
                                    {profile.get('headline')}
                                </div>
                                <div className="summary">
                                    {profile.get('summary')}
                                </div>
                            {(profile.get('skills').length) ?
                            <div className="skills">
                                <ul>
                                    {profile.get('skills').split(',').map((skill, i) => {
                                        return <li key={`${index}_${i}`}>{skill}</li>
                                    })}
                                </ul>
                            </div>
                            : <div className="skills"><i>No Skills Listed</i></div>}
                            <div className='btn tone1-2-color'>View</div>
                            </div>
                            : ''}
                    </li>
                </Link>
            )
        })}</ul> : <h2>No pending applications</h2>
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
                            <Tab>Interview Scheduled</Tab>
                            <Tab>Interviewed</Tab>
                            <Tab>Declined</Tab>
                        </TabList>

                        <TabPanel>
                            {this.props['applicants'].get('fetching') ? <div className="loading"></div> : this.showPending(data)}
                        </TabPanel>
                        <TabPanel>
                            {this.props['applicants'].get('fetching') ? <div className="loading"></div> : this.showInterviewScheduled(data)}
                        </TabPanel>
                        <TabPanel>
                            {this.props['applicants'].get('fetching') ? <div className="loading"></div> : this.showInterviewed(data)}
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