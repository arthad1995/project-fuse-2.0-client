import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown');
import { AnimationHandler } from '../../../common'

require('./style.scss')

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
        const editBtn = (this.props.canEdit && this.props.canEdit(this.props) ? <div className='edit-btn'><Link to={`/${this.props.index}/${params.id}/edit`}><i className='fa fa-pencil'></i></Link></div> : '')

        if (elem) {
            return (
                <AnimationHandler anim="SlideInTop" animKey='always'>
                    <div>
                        <h1 className='title'>{elem.get('name')} {editBtn}</h1>
                        {this.renderOwnerInfo(elem)}
                        <div className='summary'>
                            {elem.get('summary') || ''}
                        </div>
                        <div className='description'>
                            <ReactMarkdown source={elem.get('content') || ''} />
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