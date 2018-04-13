import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown')
import { Map, fromJS } from 'immutable'
import { Tab, Tabs, TabList, TabPanel } from '../../../common'
import {stopEvent} from '../../../common'
import {date_format} from '../../../../utils/date_utils'
import {declineApplicant, scheduleInterview, inviteAppToJoin, cancelAppInterview, reconsiderApplicant} from '../../../../actions/applicants'

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
        this.showInvited = this.showInvited.bind(this)
        this.reconsider = this.reconsider.bind(this)
        this.renderUser= this.renderUser.bind(this)

        this.state = {
            tabs: [
                "pending",
                "interview_scheduled",
                "interviewed",
                "invited",
                "declined"
            ]
        }
    }

    renderUser(user) {
        if (!user) {
            return null
        }
        const profile = user.get('profile') || fromJS({})
        return (
            <div className="applicant">
                <div className="applicant-info">
                    <div className="name">{user.get('name')}</div>
                    <div className="email">{user.get('email')}</div>
                </div>
                {profile?
                    <div className="applicant-profile">
                        <div className="headline">
                            {profile.get('headline')}
                        </div>
                        <div className="summary">
                            {profile.get('summary')}
                        </div>
                        {(profile.get('skills') && profile.get('skills').length) ?
                        <div className="skills">
                            <ul>
                                {profile.get('skills').split(',').map((skill, i) => {
                                    return <li key={`${i}`}>{skill}</li>
                                })}
                            </ul>
                        </div>
                        : <div className="skills"><i>No Skills Listed</i></div>}
                    </div>
                    : ''}
            </div>
        )
    }

    reload() {
        if (this.props.load)
            this.props.load(this.props.match.params.id, this.props.ui.get('applicant_tab'))
    }

    decline(elem) {
        declineApplicant(this.props.groupType, this.props.match.params.id, elem.get('id'))
            .then(this.reload)
    }

    schedInterview(elem) {
        scheduleInterview(this.props.groupType, this.props.match.params.id, elem.get('id'))
            .then(this.reload)
    }

    inviteToJoin(elem) {
        inviteAppToJoin(this.props.groupType, this.props.match.params.id, elem.get('id'))
            .then(this.reload)
    }

    reconsider(elem) {
        reconsiderApplicant(this.props.groupType, this.props.match.params.id, elem.get('id'))
            .then(this.reload)
    }

    cancelInterview(elem) {
        cancelAppInterview(this.props.groupType, this.props.match.params.id, elem.get('id'))
            .then(this.reload)
    }

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
        return data && data.size ? <ul className="applicant-list">{data.valueSeq().toArray().map((elem, index) => {
            const decline = ((e) => stopEventWrapper(e,this.decline(elem))).bind(this)
            const inviteToJoin = ((e) => stopEventWrapper(e,this.inviteToJoin(elem))).bind(this)
            const schedInterview = ((e) => stopEventWrapper(e,this.schedInterview(elem))).bind(this)
            const sender = elem.get('sender') || fromJS({})
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        {this.renderUser(sender)}
                        <div className="btns">
                            <div className='btn tone1-1-color' onClick={schedInterview}>Interview</div>
                            <div className='btn tone1-1-color' onClick={inviteToJoin}>Invite</div>
                            <div className='btn tone1-2-color'>View</div>
                            <div className='btn tone2-1-color' onClick={decline}>Decline</div>
                        </div>
                    </li>
                </Link>
            )
        })}</ul> : <h4>No pending applications</h4>
    }

    showInvited(data) {
        return data && data.size ? <ul className="applicant-list">{data.valueSeq().toArray().map((elem, index) => {
            const decline = ((e) => stopEventWrapper(e,this.decline(elem))).bind(this)
            const inviteToJoin = ((e) => stopEventWrapper(e,this.inviteToJoin(elem))).bind(this)
            const schedInterview = ((e) => stopEventWrapper(e,this.schedInterview(elem))).bind(this)
            const sender = elem.get('sender') || fromJS({})
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        {this.renderUser(sender)}
                        <div className="btns">
                            <div className='btn tone1-2-color'>View</div>
                            <div className='btn tone2-1-color' onClick={decline}>Decline</div>
                        </div>
                    </li>
                </Link>
            )
        })}</ul> : <h4>No invited applicants</h4>
    }

    showInterviewed(data) {
        return data && data.size ? <ul className="applicant-list">{data.valueSeq().toArray().map((elem, index) => {
            const decline = ((e) => stopEventWrapper(e,this.decline(elem))).bind(this)
            const inviteToJoin = ((e) => stopEventWrapper(e,this.inviteToJoin(elem))).bind(this)
            const schedInterview = ((e) => stopEventWrapper(e,this.schedInterview(elem))).bind(this)
            const sender = elem.get('sender') || fromJS({})
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        {this.renderUser(sender)}
                        <div className="btns">
                            <div className='btn tone1-1-color' onClick={inviteToJoin}>Invite</div>
                            <div className='btn tone1-2-color'>View</div>
                            <div className='btn tone1-1-color' onClick={schedInterview}>Reinterview</div>
                            <div className='btn tone2-1-color' onClick={decline}>Decline</div>
                        </div>
                    </li>
                </Link>
            )
        })}</ul> : <h4>No interviewed applicants</h4>
    }

    showInterviewScheduled(data) {
        return data && data.size ? <ul className="applicant-list">{data.valueSeq().toArray().map((elem, index) => {
            const cancelInterview = ((e) => stopEventWrapper(e,this.cancelInterview(elem))).bind(this)
            const sender = elem.get('sender') || fromJS({})
            const interview = elem.get('interview')
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        {this.renderUser(sender)}
                        {interview ?
                            <div className="interview-time">
                                Interview Time:
                                <div className="interview-time__time-display">
                                    <div className='interview-time__time-display__from'>
                                        <div className='date'>
                                            {date_format(moment(interview.get('start')), 'MMM Do')}
                                        </div>
                                        <div className='time'>
                                            {date_format(moment(interview.get('start')), 'h:mm A')}
                                        </div>
                                    </div>
                                    <div className="interview-time__time-display__separator"> - </div>
                                    <div className='interview-time__time-display__to'>
                                        <div className='date'>
                                                {date_format(moment(interview.get('end')), 'MMM Do')}
                                            </div>
                                            <div className='time'>
                                                {date_format(moment(interview.get('end')), 'h:mm A')}
                                            </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                        <div className="btns">
                            <div className='btn tone1-2-color'>View</div>
                            <div className='btn tone2-1-color' onClick={cancelInterview}>Cancel Interview</div>
                        </div>
                    </li>
                </Link>
            )
        })}</ul> : <h4>No scheduled interviews</h4>
    }

    showDeclined(data) {
        return data && data.size ? <ul className="applicant-list">{data.valueSeq().toArray().map((elem, index) => {
            const reconsider = ((e) => stopEventWrapper(e,this.reconsider(elem))).bind(this)
            const sender = elem.get('sender') || fromJS({})
            return (
                <Link to={`/users/${sender.get('id')}`} key={index}>
                    <li className="sender">
                        {this.renderUser(sender)}
                        <div className="btns">
                            <div className='btn tone1-2-color' onClick={reconsider}>Reconsider</div>
                            <div className='btn tone1-2-color'>View</div>
                        </div>
                    </li>
                </Link>
            )
        })}</ul> : <h4>No pending applications</h4>
    }

    render() {
        const params = this.props.match.params
        const data = this.props['applicants'].get('data')
        const editBtn = (this.props.canEdit && this.props.canEdit(this.props, elem) ? <div className='edit-btn'><Link to={`/${this.props.index}/${params.id}/edit`}><i className='fas fa-pencil-alt'></i></Link></div> : '')
        const customElems = this.props.customElems || (e => null)


        return (
            <div className="relative">
                <h2>Applicants</h2>
                <Tabs onSelect={this.tabChange} selectedIndex={this.state.tabs.indexOf(this.props.ui.get('applicant_tab'))}>
                    <TabList>
                        <Tab>Pending</Tab>
                        <Tab>Interviews</Tab>
                        <Tab>Interviewed</Tab>
                        <Tab>Invited</Tab>
                        <Tab>Declined</Tab>
                    </TabList>

                    <TabPanel>
                        {this.props['applicants'].get('fetching') ?
                            <div className="loading"></div> :
                                this.showPending(data)
                        }
                    </TabPanel>
                    <TabPanel>
                        {this.props['applicants'].get('fetching') ?
                            <div className="loading"></div> :
                                this.showInterviewScheduled(data)
                        }
                    </TabPanel>
                    <TabPanel>
                        {this.props['applicants'].get('fetching') ?
                            <div className="loading"></div> :
                                this.showInterviewed(data)}
                    </TabPanel>
                    <TabPanel>
                        {this.props['applicants'].get('fetching') ?
                            <div className="loading"></div> :
                                this.showInvited(data)}
                    </TabPanel>
                    <TabPanel>
                        {this.props['applicants'].get('fetching') ?
                            <div className="loading"></div> :
                                this.showDeclined(data)}
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default Page