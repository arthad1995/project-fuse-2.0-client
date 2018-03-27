import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown')
import {Map} from 'immutable'
import config from '../../../../config'

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

    renderLinks(profile) {
        if (profile.get('links')) {
            return <div>
                <h3>Links</h3>
                <div className="profile-links">
                    {profile.get('links').map((link, index) => (
                        <a key={index} target="_blank" href={link.get('link')}>
                            <div className="link-card">
                                {link.get('img') ? <div className="link-card__img">
                                    <img src={link.get('img')} />
                                </div> : <div class="link-card__title">
                                    {link.get('title') || link.get('name')}
                                </div>}
                            </div>
                        </a>)
                    )}
                </div>
            </div>
        }
    }

    render() {
        if (this.props[this.props.index].get('fetching')) {
            return <div className="loading"></div>
        }
        const params = this.props.match.params
        const data = this.props[this.props.index].get('data')
        const elem = (data) ? data.get(params.id) : null
        const editBtn = (
            this.props.canEdit && this.props.canEdit(this.props, elem) ?
                <div className='edit-btn'>
                    <Link to={`/${this.props.index}/${params.id}/edit`}>
                        <i className='fas fa-pencil-alt'/>
                    </Link>
                </div> :
                ''
        )
        const customElems = this.props.customElems || (e =>null)

        if (elem) {
            const profile = elem.get('profile') || Map()
            return (
                <div className="profile">
                    <div className="profile_header">
                        <img src={(profile.get('background_id')
                            ? config.host + '/files/download/' + profile.get('background_id')
                            : '/assets/images/background-default.png')}
                        />
                    </div>
                    <div className="profile_title">
                        <div className="profile_picture"><div><img src={
                            profile.get('thumbnail_id') ?
                                config.host + '/files/download/' + profile.get('thumbnail_id') :
                                '/assets/images/profile_icon.svg'
                        } className="profile_picture__img" /></div></div>
                        {editBtn}
                        <h1 className='title'>{elem.get('name')}</h1>
                        {elem.get('owner') ? this.renderOwnerInfo(elem) : ''}
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
                        {this.renderLinks(profile)}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>
                        {this.props.notFoundMsg}
                    </h1>
                </div>
            )
        }
    }
}

export default Page