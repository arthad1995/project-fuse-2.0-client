import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { mapSingleKey } from '../mapping_helpers'
import { stopEvent } from './stopEvent'
import TimeKeeper from 'react-timekeeper'
import DayPicker from 'react-day-picker'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Field, reduxForm } from 'redux-form'
const v = require('voca')
const dateFormat = require('dateformat')
import 'react-day-picker/lib/style.css';

const formName = 'interview-time'

class DateTimePicker extends Component {
    constructor(props) {
        super(props)

        const today = new Date();
        let tomorrow = today;
        tomorrow.setDate(today.getDate() + 1);

        let initialDate = tomorrow
        let initialTime = '12:00pm'

        if (this.props.initial_value) {
            const split = this.props.initial_value.split(/\s+/)
            const date = split[0].split('/')
            const time = split[1]

            initialDate = new Date(date[2], date[0] - 1, date[1])
            initialTime = time
        }

        const name = this.props.name || ''
        const fieldName = `datetime__${v.snakeCase(name)}`

        this.state = {
            time: initialTime,
            selectedDay: initialDate,
            displayTimepicker: false,
            name,
            fieldName
        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.handleDayClick = this.handleDayClick.bind(this);

        const doneClick = () => {
            this.toggleTimekeeper(false)
            this.props.dispatch({
                meta: {
                    field: this.state.fieldName,
                    form: formName,
                    persistentSubmitErrors: false,
                    touch: false
                },
                payload: dateFormat(this.state.selectedDay, "mm/dd/yyyy") + " " + this.state.time,
                type: "@@redux-form/CHANGE"
            })
        }

        this.state.doneClick = doneClick
    }

    componentDidMount() {
        this.state.doneClick()
    }

    handleTimeChange(newTime) {
        this.setState({ time: newTime.formatted })
    }

    toggleTimekeeper(val) {
        this.setState({ displayTimepicker: val })
    }

    handleDayClick(day, { selected }) {
        this.setState({
            selectedDay: selected ? undefined : day,
        });
    }

    render() {
        const toggleTimekeeper = this.toggleTimekeeper
        const today = new Date();
        let tomorrow = today;
        tomorrow.setDate(today.getDate() + 1);

        const fieldName = this.state.fieldName
        const name = this.state.name

        const doneClick = this.state.doneClick
        //doneClick()

        return (
            <div>
                {this.state.displayTimepicker ?
                    <div className='modalDialog timepicker show' onClick={() => { this.toggleTimekeeper(false) }}>
                        <div onClick={(e) => { stopEvent(e); return false; }}>
                            <Tabs>
                                <TabList>
                                    <Tab>Date</Tab>
                                    <Tab>Time</Tab>
                                </TabList>

                                <TabPanel>
                                    <DayPicker
                                        selectedDays={this.state.selectedDay}
                                        onDayClick={this.handleDayClick}
                                        disabledDays={[
                                            {
                                                before: tomorrow,
                                            },
                                        ]}
                                    />
                                    <div onClick={doneClick} className='done-date-btn'>Done</div>
                                </TabPanel>
                                <TabPanel>
                                    <div className='no-margin'>
                                        <TimeKeeper
                                            time={this.state.time}
                                            onChange={this.handleTimeChange}
                                            onDoneClick={doneClick}
                                            switchToMinuteOnHourSelect={true}
                                        />
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                    : false
                }
                <label htmlFor={fieldName}>{v.titleCase(name)}:</label>
                <Field component="input" onFocus={() => this.toggleTimekeeper(true)} type="text" name={fieldName} />
            </div>
        )
    }
}

let _InterviewTimePicker = props => {
    const {handleSubmit, dispatch} = props
    return (
        <form onSubmit={handleSubmit}>
            <DateTimePicker dispatch={dispatch} name="interview start" onChange={(val) => this.setState()} />
            <DateTimePicker dispatch={dispatch} name="interview end" />
            <input type="submit" value="Save" />
        </form>
    )
}

const InterviewTimePicker = reduxForm({ 
    form: formName, 
    destroyOnUnmount: false 
})(_InterviewTimePicker)

export default InterviewTimePicker
