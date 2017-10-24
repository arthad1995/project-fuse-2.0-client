import React, {Component} from 'react'
import { connect } from 'react-redux'

class Card extends Component {
    constructor(props){ super(props)}

    render(){
        const title = this.props.title || ''
        const content = this.props.content || ''
        const type = this.props.type || 'info'
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
            case 'info':
            default:
                break
        }

        const iconClassName = `fa ${icon}`
        const bubbleClassName = `bubble ${color}-color`
        let contentTag = <div className='content'>{content}</div>
        if(!content) contentTag = <div className='minorPadding'></div>

        return (
            <div className='card'>
                <div className={bubbleClassName}><i className={iconClassName}></i></div>
                <div className='title'>{title}</div>
                {contentTag}
            </div>
        )
    }
}

export default Card