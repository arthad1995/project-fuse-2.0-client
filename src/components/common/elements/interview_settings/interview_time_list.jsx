import React, { Component } from 'react'
import dfns from 'date-fns'
import Clock from '../clock'

require('./interview_time_list.scss')

export default class InterviewTimeList extends Component {
    render() {
        const slots = this.props.slots || []
        return (
            <ul className="interview_slots">
                {slots.map((elem, index) => {
                    const startDate = dfns.parse(elem.get('start'))
                    const endDate = dfns.parse(elem.get('end'))
                    return (
                        <li key={index} >
                            <div className="row">
                                <div className="inline">
                                    <div className='start'>
                                        <div className='date'> 
                                            {dfns.format(startDate, 'MMM Do')}
                                        </div>
                                        <div className='time'>
                                            {dfns.format(startDate, 'h:mm A')}
                                        </div>
                                    </div>
                                    <div className="inline">
                                        <Clock min={startDate.getMinutes()} hr={startDate.getHours()} />
                                    </div>
                                    <div className='arrow' />
                                    <div className='end'>
                                        <div className='date'> 
                                            {dfns.format(endDate, 'MMM Do')}
                                        </div>
                                        <div className='time'>
                                            {dfns.format(endDate, 'h:mm A')}
                                        </div>
                                    </div>
                                    <div className="inline">
                                        <Clock min={endDate.getMinutes()} hr={endDate.getHours()} />
                                    </div>
                                    <div className='tools'>
                                        <i className='fa fa-pencil' />
                                        <i className='fa fa-trash' />
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
