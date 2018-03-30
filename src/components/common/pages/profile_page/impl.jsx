import v from 'voca'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown')
import {Map} from 'immutable'
import config from '../../../../config'
import UrlParse from 'url-parse'
import {titleName, getEmbedLink} from '../../../../utils/link'
import VideoEmbed from '../../elements/video_embed'

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
        const formatLink = (link, type) => {
            if (!link.match(/^https?:\/\//)) {
                link = `http://${link}`
            }
            let parsed = UrlParse(link)

            const getLinkWithHost = (link, host, pathNamePrepend) => {
                link = `https://${host}/${link.replace(/^(\w+:)?\/\//, '')}`
                let parsed = UrlParse(link)
                if (pathNamePrepend) {
                    const regex = new RegExp(`/^\\/${pathNamePrepend}/`)
                    if (!regex.test(parsed.pathname)) {
                        parsed.pathname = `/${pathNamePrepend}${parsed.pathname}`
                    }
                }
                return parsed
            }

            const badHostName = (parsed, hostname) => parsed.hostname !== hostname && parsed.hostname !== `www.${hostname}`

            switch (v.lowerCase(type)) {
                case 'github': {
                    if (badHostName(parsed, 'github.com')) {
                        parsed = getLinkWithHost(link, 'github.com')
                    }
                    break
                }
                case 'linkedin': {
                    if (badHostName(parsed, 'linkedin.com')) {
                        parsed = getLinkWithHost(link, 'www.linkedin.com', 'in')
                    }
                    break
                }
                case 'youtube': {
                    if (badHostName(parsed, 'youtube.com')) {
                        parsed = getLinkWithHost(link, 'www.youtube.com', 'channel')
                    }
                    break
                }
                case 'facebook': {
                    if (badHostName(parsed, 'facebook.com')) {
                        parsed = getLinkWithHost(link, 'www.facebook.com')
                    }
                    break
                }
                case 'twitter': {
                    if (badHostName(parsed, 'twitter.com')) {
                        parsed = getLinkWithHost(link, 'www.twitter.com')
                    }
                    break
                }
                case 'wordpress': {
                    if (!parsed.hostname.match(/\.wordpress\.com/) && !parsed.hostname.match(/\.\w+/)) {
                        parsed.hostname += '.wordpress.com'
                    }
                    break
                }
            }
            return `${parsed.protocol}//${parsed.hostname}${parsed.pathname}${parsed.query}`
        }
        if (profile.get('links') && profile.get('links').size) {
            const numLinks = profile.get('links').filter(link => link.get('name') !== 'video').size
            const numVideos = profile.get('links').filter(link => link.get('name') === 'video').size
            return <div>
                {numVideos > 0 ?
                    <div>
                        <h3>Videos</h3>
                        <div className="video-links">
                            {profile.get('links')
                                .filter(link => link.get('name') === 'video')
                                .reverse()
                                .map((link, index) => (
                                <div key={index} className="link-card">
                                    <div className="link-card__video">
                                        <VideoEmbed src={link.get('link')} />
                                    </div>
                                </div>)
                            )}
                        </div>
                    </div>
                 : null}
                {numLinks > 0 ?
                    <div>
                        <h3>Links</h3>
                        <div className="profile-links">
                            {profile.get('links')
                                .filter(link => link.get('name') !== 'video')
                                .sort((a, b) => a.get('name') < b.get('name') ? -1 : b.get('name') < a.get('name') ? 1 : 0)
                                .map((link, index) => (
                                <a
                                    key={index}
                                    target="_blank"
                                    href={formatLink(link.get('link'), link.get('name'))}
                                    title={titleName(link.get('title') || link.get('name'))}
                                >
                                    <div className="link-card">
                                        {link.get('img') ? <div className="link-card__img">
                                            <img src={link.get('img')} />
                                        </div> : <div className="link-card__title">
                                            {v.titleCase(link.get('title')) || v.titleCase(link.get('name'))}
                                        </div>}
                                    </div>
                                </a>)
                            )}
                        </div>
                    </div>: null}
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
            console.log(elem.get('groupType'))
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
                                    elem.get('groupType') === 'Project' ? '/assets/images/project_profile_icon.svg' :
                                    elem.get('groupType') === 'Organization' ? '/assets/images/org_profile_icon.svg' :
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