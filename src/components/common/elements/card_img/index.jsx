import React, {Component} from 'react'
import { connect } from 'react-redux'
import Timestamp from 'react-timestamp'
import {Link} from 'react-router-dom'

class CardImg extends Component {
    constructor(props){ super(props)}

    render(){
        const title = this.props.title || ''
        const content = this.props.content || this.props.children || ''
        const img = this.props.img || ''

        let footer = this.props.footer || ''

        let imgTag = (img) ? <div className='img'><img src={img} /></div> : ''
        let contentTag = <div className='content'>{content}</div>
        if(!content) contentTag = <div className='minorPadding'></div>

        return (
            <div className={`card ${this.props.className}`} onClick={this.props.onClick}>
                <div className='cardHeader'>
                    {imgTag}
                    <div className='title full'>{title}</div>
                </div>
                {contentTag}
                <div className='cardFooter'>
                    {footer}
                </div>
            </div>
        )
    }
}

export default CardImg