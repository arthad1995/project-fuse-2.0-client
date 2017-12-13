import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown');
import { AnimationHandler } from '../../../common'
import {Map} from 'immutable'

class Page extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.load)
            this.props.load(this.props.match.params.id)
    }

    renderUser(user){
        console.log(user)
        return (
            <li key={user.get('id')}>
                <div className='user-info'>
                    <div className='user-name'>{user.get('name')}</div>
                    <div className='user-email'>{user.get('email')}</div>
                </div>
            </li>
        )
    }

    render() {
        if (this.props['members'].get('fetching')) {
            return <div className="loading"></div>
        }
        const params = this.props.match.params
        const data = this.props['members'].get('data')
        const editBtn = (this.props.canEdit && this.props.canEdit(this.props, elem) ? <div className='edit-btn'><Link to={`/${this.props.index}/${params.id}/edit`}><i className='fas fa-pencil-alt'></i></Link></div> : '')
        const customElems = this.props.customElems || (e =>null)

        if (data) {
            return (
                <AnimationHandler anim="SlideInTop" animKey='always'>
                    <ul className="member-list">
                            {data.valueSeq().toArray().map(this.renderUser)}
                    </ul>
                </AnimationHandler>
            )
        }
        else {
            return (<div><h1>{this.props.notFoundMsg}</h1></div>)
        }
    }
}

export default Page