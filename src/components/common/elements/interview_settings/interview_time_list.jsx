import React, { Component } from 'react'
import {parse_date, date_format} from '../../../../utils/date_utils'
import Clock from '../clock'

export default class InterviewTimeList extends Component {
    render() {
        const slots = this.props.slots || {}
        return (
            <ul className="interview_slots">
                {Object.entries(slots).map(elem => {
                    const index = elem[0]
                    elem = elem[1]
                    if(typeof elem !== 'object') return null
                    if(!elem.start || !elem.end) return null
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
                                        <Clock min={startDate.minute()} hr={startDate.hour() % 12} />
                                    </div>
                                    <i className="fas fa-arrow-right"></i>
                                    <div className='end'>
                                        <div className='date'> 
                                            {date_format(endDate, 'MMM Do')}
                                        </div>
                                        <div className='time'>
                                            {date_format(endDate, 'h:mm A')}
                                        </div>
                                    </div>
                                    <div className="inline">
                                        <Clock min={endDate.minute()} hr={endDate.hour() % 12} />
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
