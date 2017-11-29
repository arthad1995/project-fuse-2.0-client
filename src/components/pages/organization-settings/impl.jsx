import React, { Component } from 'react'
import { Link } from 'react-dom'
import { connect } from 'react-redux'
import Sidebar from './sidebar'
import { InterviewTimeList, InterviewTimePicker, AnimationHandler } from '../../common'
import { fromJS } from 'immutable'
import { show_time_picker, hide_time_picker } from '../../../actions/ui'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const mapStateToProps = (state) => {
    return {
        showTimePicker: state.ui.get("show_time_picker")
    }
}

@connect(mapStateToProps)
class Page extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.params && this.props.params.load)
            this.props.params.load(this.props.match.params.id)
    }

    render() {
        return (
            <div>
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
        )
    }
}

export default Page