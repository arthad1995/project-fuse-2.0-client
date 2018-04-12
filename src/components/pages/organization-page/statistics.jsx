import React, {Component} from 'react'
import PropTypes from 'prop-types'
React.PropTypes = PropTypes
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {loadSummaries, loadInvalidProfileBreakdown, loadProjectInterviewBreakdown, loadUserInterviewBreakdown} from '../../../actions/statistics'
import {stopEvent} from '../../common'
import {PieChart, Legend, ToolTip} from 'react-easy-chart'
import {date_format} from '../../../utils/date_utils'

@connect(state => {
    return {
        organization: state.org,
        statistics: state.statistics
    }
})
class OrganizationStatistics extends Component {
    constructor(props) {
        super(props)
        this.drawProfileSummary = this.drawProfileSummary.bind(this)
        this.drawUserInterviewSummary = this.drawUserInterviewSummary.bind(this)
        this.drawProjectInterviewSummary = this.drawProjectInterviewSummary.bind(this)
        this.drawUserInterviewBreakdown = this.drawUserInterviewBreakdown.bind(this)
        this.drawProjectInterviewBreakdown = this.drawProjectInterviewBreakdown.bind(this)
        this.drawProfileBreakdown = this.drawProfileBreakdown.bind(this)

        this.state = {
            drawProfileBreakdown: false,
            drawUserInterviewBreakdown: false,
            drawProjectInterviewBreakdown: false
        }
    }

    componentWillMount() {
        loadSummaries(this.props.match.params.id)
    }

    render() {
        return (
            <div className="statistics">
                {this.drawUserInterviewSummary()}
                {this.drawUserInterviewBreakdown()}
                {this.drawProjectInterviewSummary()}
                {this.drawProjectInterviewBreakdown()}
                {this.drawProfileSummary()}
                {this.drawProfileBreakdown()}
            </div>
        )
    }

    drawProfileSummary() {
        if (this.props.statistics.invalid_profile_summary.fetched) {
            let data = this.props.statistics.invalid_profile_summary.data
            if (!data.length) {
                data = [{}]
            }

            const numMembers = data[0].numMembers || 1
            const numMembersNoSummary = data[0].numMembersNoSummary || 0
            const numMembersNoHeadline = data[0].numMembersNoHeadline || 0
            const numMembersNoThumbnail = data[0].numMembersNoThumbnail || 0

            const userSummaryData = [
                {
                    key: 'Users Without a Profile Summary',
                    value: numMembersNoSummary
                },
                {
                    key: 'Users With a Profile Summary',
                    value: numMembers - numMembersNoSummary
                }
            ]

            const userHeadlineDate = [
                {
                    key: 'Users Without a Profile Headline',
                    value: numMembersNoHeadline
                },
                {
                    key: 'Users With a Profile Headline',
                    value: numMembers - numMembersNoHeadline
                }
            ]

            const userImageData = [
                {
                    key: 'Users Without a Profile Image',
                    value: numMembersNoThumbnail
                },
                {
                    key: 'Users With a Profile Image',
                    value: numMembers - numMembersNoThumbnail
                }
            ]

            return <div>
                <h1>User Profiles</h1>
                <div className="user-profile-charts">
                    <div>
                        <h2>Profile Summaries</h2>
                        <PieChart
                            size={150}
                            data={userSummaryData}
                        />
                        <Legend data={userSummaryData} dataId={'key'} horizontal />
                    </div>
                    <div>
                        <h2>Profile Headlines</h2>
                        <PieChart
                            size={150}
                            data={userHeadlineDate}
                        />
                        <Legend data={userHeadlineDate} dataId={'key'} horizontal />
                    </div>
                    <div>
                        <h2>Profile Images</h2>
                        <PieChart
                            size={150}
                            data={userImageData}
                        />
                        <Legend data={userImageData} dataId={'key'} horizontal />
                    </div>
                </div>
            </div>
        } else {
            return <div>
                <h1> User Profiles</h1>
                <div className="loading"></div>
            </div>
        }
    }

    drawUserInterviewSummary() {

        if (this.props.statistics.member_interview_summary.fetched) {
            const interviewCounts = this.props.statistics.member_interview_summary.data.reduce(
                (acc, data) => {
                    return Object.assign({},
                        acc,
                        {
                            [data.numberOfInterviews]: (acc[data.numberOfInterviews] || 0) + 1
                        }
                    )
                },
                {}
            )

            const data = Object.entries(interviewCounts).map(
                entry => {
                    const count = entry[0]
                    const data = entry[1]
                    if (count !== "1") {
                        return {
                            key: `Users with ${count} Interviews`,
                            value: data
                        }
                    }
                    return {
                        key: 'Users with 1 Interview',
                        value: data
                    }
                }
            )


            return <div>
                <h1>User Interviews Scheduled</h1>
                <div className="user-interviews-scheduled-charts">
                    <h3>Percentage of users by number of interviews</h3>
                    <PieChart
                        size={200}
                        data={data}
                    />
                    <Legend data={data} dataId={'key'} horizontal />
                </div>
            </div>
        } else {
            return <div>
                <h1>User Interviews</h1>
                <div className="loading"></div>
            </div>
        }
    }

    drawProjectInterviewSummary() {

        if (this.props.statistics.project_interview_summary.fetched) {
            const interviewCounts = this.props.statistics.project_interview_summary.data.reduce(
                (acc, data) => {
                    return Object.assign({},
                        acc,
                        {
                            [data.usedInterviews]: (acc[data.usedInterviews] || 0) + 1
                        }
                    )
                },
                {}
            )

            const interviewsScheduled = Object.entries(interviewCounts).map(
                entry => {
                    const count = entry[0]
                    const data = entry[1]
                    if (count !== "1") {
                        return {
                            key: `Projects with ${count} Interviews`,
                            value: data
                        }
                    }
                    return {
                        key: 'Projects with 1 Interview',
                        value: data
                    }
                }
            )


            return <div>
                <h1>Scheduled Project Interviews</h1>
                <div className="project-interviews-scheduled-charts">
                    <PieChart
                        size={200}
                        data={interviewsScheduled}
                    />
                    <Legend data={interviewsScheduled} dataId={'key'} horizontal />
                </div>
            </div>
        } else {
            return <div>
                <h1>Project Interviews</h1>
                <div className="loading"></div>
            </div>
        }
    }

    drawUserInterviewBreakdown() {
        const toggleBreakdown = () => {
            if (!this.state.drawUserInterviewBreakdown) {
                loadUserInterviewBreakdown(this.props.match.params.id)
            }
            this.setState({
                drawUserInterviewBreakdown: !this.state.drawUserInterviewBreakdown
            })
        }
        if (!this.state.drawUserInterviewBreakdown) {
            return <div
                className="show-breakdown"
                onClick={toggleBreakdown}
            />
        } else {
            return <div>
                <div
                    className="hide-breakdown"
                    onClick={toggleBreakdown}
                />
                {this.props.statistics.member_interview_breakdown.fetched ?
                    <div className='user-interview-breakdown'>
                        <div className='user-interview-breakdown__header'>
                            User
                        </div>
                        <div className='user-interview-breakdown__header'>
                            Number of Interviews
                        </div>
                        {
                            this.props.statistics.member_interview_summary.data.map(
                                entry => {
                                    return [
                                        <div className='user-interview-breakdown__user' key={`upb-name-${entry.id}`}>
                                            {entry.member_name}
                                        </div>,
                                        <div className='user-interview-breakdown__num-interviews' key={`upb-summary-${entry.id}`}>
                                            {entry.numberOfInterviews || 0}
                                        </div>
                                    ]
                                }
                            )
                        }
                    </div>
                : <div className="loading" />}
            </div>
        }
    }

    drawProjectInterviewBreakdown() {
        const toggleBreakdown = () => {
            if (!this.state.drawProjectInterviewBreakdown) {
                loadProjectInterviewBreakdown(this.props.match.params.id)
            }
            this.setState({
                drawProjectInterviewBreakdown: !this.state.drawProjectInterviewBreakdown
            })
        }
        if (!this.state.drawProjectInterviewBreakdown) {
            return <div
                className="show-breakdown"
                onClick={toggleBreakdown}
            />
        } else {
            return <div>
                <div
                    className="hide-breakdown"
                    onClick={toggleBreakdown}
                />
                {this.props.statistics.project_interview_breakdown.fetched ?
                    <div className='project-interview-breakdown'>
                        <div className='project-interview-breakdown__header'>
                            Project
                        </div>
                        <div className='project-interview-breakdown__header'>
                            Interviewee
                        </div>
                        <div className='project-interview-breakdown__header'>
                            Start
                        </div>
                        <div className='project-interview-breakdown__header'>
                            End
                        </div>{
                            this.props.statistics.project_interview_breakdown.data.map(
                                entry => {
                                    return [
                                        <div className='project-interview-breakdown__project' key={`upb-name-${entry.id}`}>
                                            {entry.projectName}
                                        </div>,
                                        <div className='project-interview-breakdown__interviewee' key={`upb-summary-${entry.id}`}>
                                            {entry.member_name || <i>None</i>}
                                        </div>,
                                        <div className='project-interview-breakdown__start' key={`upb-headline-${entry.id}`}>
                                            {date_format(entry.start, 'MM/DD/YYYY h:mm:ssA')}
                                        </div>,
                                        <div className='project-interview-breakdown__end' key={`upb-image-${entry.id}`}>
                                            {date_format(entry.end, 'MM/DD/YYYY h:mm:ss A')}
                                        </div>,
                                    ]
                                }
                            )
                        }
                    </div>
                : <div className="loading" />}
            </div>
        }
    }

    drawProfileBreakdown() {
        const toggleBreakdown = () => {
            if (!this.state.drawProfileBreakdown) {
                loadInvalidProfileBreakdown(this.props.match.params.id)
            }
            this.setState({
                drawProfileBreakdown: !this.state.drawProfileBreakdown
            })
        }
        if (!this.state.drawProfileBreakdown) {
            return <div
                className="show-breakdown"
                onClick={toggleBreakdown}
            />
        } else {
            return <div>
                <div
                    className="hide-breakdown"
                    onClick={toggleBreakdown}
                />
                {this.props.statistics.invalid_profile_breakdown.fetched ?
                    <div className='user-profile-breakdown'>
                        <div className='user-profile-breakdown__header'>
                            Name
                        </div>
                        <div className='user-profile-breakdown__header'>
                            Has Summary
                        </div>
                        <div className='user-profile-breakdown__header'>
                            Has Headline
                        </div>
                        <div className='user-profile-breakdown__header'>
                            Has Image
                        </div>
                        {this.props.statistics.invalid_profile_breakdown.data.map(
                            entry => {
                                return [
                                    <div className='user-profile-breakdown__name' key={`upb-name-${entry.id}`}>
                                        {entry.member_name}
                                    </div>,
                                    <div className={'user-profile-breakdown__summary ' + (entry.hasSummary ? 'upb-yes' : 'upb-no')} key={`upb-summary-${entry.id}`} />,
                                    <div className={'user-profile-breakdown__headline ' + (entry.hasHeadline ? 'upb-yes' : 'upb-no')} key={`upb-headline-${entry.id}`} />,
                                    <div className={'user-profile-breakdown__image ' + (entry.hasThumbnail ? 'upb-yes' : 'upb-no')} key={`upb-image-${entry.id}`} />,
                                ]
                            }
                        )}
                    </div>
                : <div className="loading" />}
            </div>
        }
    }
}

export default OrganizationStatistics
