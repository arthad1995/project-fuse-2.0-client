import React, { Component } from 'react'
import {parse_date, date_format} from '../../../../utils/date_utils'
import Clock from '../clock'

require('./interview_time_list.scss')

export default class InterviewTimeList extends Component {
    render() {
        const slots = this.props.slots || {}
        return (
            <ul className="interview_slots">
                {Object.entries(slots).map(elem => {
                    const index = elem[0]
                    elem = elem[1]
                    const startDate = parse_date(elem.start)
                    const endDate = parse_date(elem.end)
                    return (
                        <li key={index} >
                            <div className="row">
                                <div className="inline">
                                    <div className='start'>
                                        <div className='date'> 
                                            {date_format(startDate, 'MMM Do')}
                                        </div>
                                        <div className='time'>
                                            {date_format(startDate, 'h:mm A')}
                                        </div>
                                    </div>
                                    <div className="inline">
                                        <Clock min={startDate.minutes()} hr={startDate.hours()} />
                                    </div>
                                    <div className='arrow' />
                                    <div className='end'>
                                        <div className='date'> 
                                            {date_format(endDate, 'MMM Do')}
                                        </div>
                                        <div className='time'>
                                            {date_format(endDate, 'h:mm A')}
                                        </div>
                                    </div>
                                    <div className="inline">
                                        <Clock min={endDate.minutes()} hr={endDate.hours()} />
                                    </div>
                                    <div className='tools'>
                                        {/*<i className='fa fa-pencil' />
                                        <i className='fa fa-trash' />*/}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}
