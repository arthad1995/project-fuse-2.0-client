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

    renderOwnerInfo(elem) {
        if (elem.get('owner')) {
            const owner = elem.get('owner')
            return <div className='ownerInfo'>
                Owned By: <Link to={`/users/${owner.get('id')}`}>
                    <span className='ownerName'>{owner.get('name')}</span>
                </Link>
            </div>
        }
        return '';
    }

    render() {
        if (this.props[this.props.index].get('fetching')) {
            return <div className="loading"></div>
        }
        const params = this.props.match.params
        const data = this.props[this.props.index].get('data')
        const elem = (data) ? data.get(params.id) : null
        const editBtn = (this.props.canEdit && this.props.canEdit(this.props, elem) ? <div className='edit-btn'><Link to={`/${this.props.index}/${params.id}/edit`}><i className='fas fa-pencil-alt'></i></Link></div> : '')
        const customElems = this.props.customElems || (e =>null)

        if (elem) {
            const profile = elem.get('profile') || Map()
            return (
                <AnimationHandler anim="SlideInTop" animKey='always'>
                    <div className="profile">
                        <div className="profile_header"></div>
                        <div className="profile_title">
                            <div className="profile_picture"><div><i className="fa fa-user" /></div></div>
                            {editBtn}
                            <h1 className='title'>{elem.get('name')}</h1>
                            {this.renderOwnerInfo(elem)}
                            <div className='headline'>
                                {profile.get('headline') || ''}
                            </div>
                            <div className='summary'>
                                {profile.get('summary') || ''}
                            </div>
                            {customElems(elem)}
                            <div className='description'>
                                <ReactMarkdown source={elem.get('content') || ''} />
                            </div>
                        </div>
                    </div>
                </AnimationHandler>
            )
        }
        else {
            return (<div><h1>{this.props.notFoundMsg}</h1></div>)
        }
    }
}

export default Page