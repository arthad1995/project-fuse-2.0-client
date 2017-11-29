import React, {Component} from 'react'
import { connect } from 'react-redux'
import Timestamp from 'react-timestamp'
import {Link} from 'react-router-dom'

require('./style.scss')

class Card extends Component {
    constructor(props){ super(props)}

    render(){
        const title = this.props.title || ''
        const content = this.props.content || ''
        const type = this.props.type || 'info'
        const time = this.props.time || ((Date.now() / 1000) | 0);
        let footer = ''
        let icon = 'fa-info'
        let color = 'yellow'

        switch(type){
            case 'announcment':
                icon = 'fa-bullhorn'
                color = 'red'
                break
            case 'reminder':
                icon = 'fa-bell'
                color='green'
                break;
            case 'message':
                icon='fa-envelope'
                color='blue'
                break;
            case 'acceptance':
                icon='fa-check'
                color='green'
                footer=(
                    <div><Link to='/projects/1'>See Project Members</Link></div>
                )
                break;
            case 'invite': 
                icon='fa-plus'
                color='purple'
                footer=<div>
                    <div className='btn green-color'>Accept</div>
                    <div className='btn red-color'>Decline</div>
                </div>
                break
            case 'info':
            default:
                break
        }
        //color='accent-light'

        const iconClassName = `fa ${icon}`
        const bubbleClassName = `bubble ${color}-color`
        let contentTag = <div className='content'>{content}</div>
        if(!content) contentTag = <div className='minorPadding'></div>

        return (
            <div className='card'>
                <div className={bubbleClassName}><i className={iconClassName}></i></div>
                <div className='title'>{title}</div>
                {contentTag}
                <div className='cardFooter'>
                    {footer}
                </div>
                <div className="time">
                    <Timestamp autoUpdate time={time} />
                </div>
            </div>
        )
    }
}

export default Card