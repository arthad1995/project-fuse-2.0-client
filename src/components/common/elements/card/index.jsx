import React, {Component} from 'react'
import { connect } from 'react-redux'
import Timestamp from 'react-timestamp'
import {Link} from 'react-router-dom'

class Card extends Component {
    constructor(props){ super(props)}

    render(){
        const title = this.props.title || ''
        const content = this.props.content || ''
        const type = this.props.type || 'info'
        const time = this.props.time || ((Date.now() / 1000) | 0);

        const accept = this.props.accept || (()=>{})
        const decline = this.props.decline || (()=>{})

        let footer = ''
        let fa_class = 'fa'
        let icon = 'fa-info'
        let color = 'tone1-3' // 1-1

        switch(type){
            case 'announcement':
                icon = 'fa-bullhorn'
                color = 'tone1-5' //1-2
                break
            case 'reminder':
                icon = 'fa-bell'
                color='tone1-1' //1-3
                break;
            case 'message':
                icon='fa-comment-alt'
                fa_class='fas'
                color='tone1-2' //1-4
                break;
            case 'invite': 
                icon='fa-plus-circle'
                fa_class='fas'
                color='tone1-2' //1-5
                footer=<div>
                    <div className='btn tone1-1-color' onClick={accept}>Accept</div>
                    <div className='btn tone1-2-color' onClick={decline}>Decline</div>
                </div>
                break
            case 'declined': 
                icon='fa-times-circle'
                color='tone1-6' //1-5
                break
            case 'acceptance':
                    icon='fa-check'
                    color='tone1-4' //1-6
                    footer=[
                        <div className="nofloat" key="time">Your interview is scheduled for: {this.props.schedule}</div>,
                        <div className="nofloat" key="link"><Link to='/projects/1'>See Project</Link></div>
                    ]
                    break;
            case 'info':
                    color='tone1-3'
                    fa_class="fas"
                    icon='fa-info-circle'
            default:
                break
        }
        //color='accent-light'

        const iconClassName = `${fa_class} ${icon}`
        const bubbleClassName = `bubble ${color}-color`
        let contentTag = <div className='content'>{content}</div>
        if(!content) contentTag = <div className='minorPadding'></div>

        return (
            <div className='card'>
                <div className='cardHeader'>
                    <div className={bubbleClassName}><i className={iconClassName}></i></div>
                    <div className='title'>{title}</div>
                </div>
                {contentTag}
                {(footer) ? 
                    <div className='cardFooter'>
                        {footer}
                    </div>
                    : ''
                }
                <div className="time">
                    <Timestamp autoUpdate time={time} />
                </div>
            </div>
        )
    }
}

export default Card