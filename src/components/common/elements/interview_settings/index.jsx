import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Async, AnimationHandler } from '../../../common'
import { show_time_picker, hide_time_picker } from '../../../../actions/ui'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import {fromJS} from 'immutable'

const InterviewTimeList = (props) => <Async load={import('./interview_time_list')} {...props} />
const InterviewTimePicker = (props) => <Async load={import('./interview_time_picker')} {...props} />

const mapStateToProps = (state) => {
    return {
        showTimePicker: state.ui.get("show_time_picker")
    }
}

@connect(mapStateToProps)
export default class InterviewSettings extends Component {
    render() {
        return <div>
            <h2>Interview Settings <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {!this.props.showTimePicker ?
                    <div className={'edit-btn'}>
                        <a onClick={() => this.props.dispatch(show_time_picker())}>
                            <i className='fa fa-plus'></i> New Timeslot</a>
                    </div>
                    : null
                }
            </CSSTransitionGroup>
            </h2>
            <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {this.props.showTimePicker
                    ? <div key={1}><InterviewTimePicker onSubmit={(e) => console.log(e)} dispatch={this.props.dispatch} cancel={() => this.props.dispatch(hide_time_picker())} /></div>
                    : <div key={2} className='hidden'><InterviewTimePicker onSubmit={() => { }} dispatch={() => { }} cancel={() => { }} /></div>
                }
            </CSSTransitionGroup>
            <InterviewTimeList slots={fromJS([
                { start: '2008-09-15T15:53:00+05:00', end: '2008-09-15T16:53:00+05:00' },
                { start: '2008-09-15T15:53:00-05:00', end: '2008-09-15T16:53:00-05:00' }
            ])} onSubmit={state => (vals) => console.log(vals)} />
        </div>
    }
}
