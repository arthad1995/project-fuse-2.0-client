import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown');
import { AnimationHandler, ListItem } from '../../../common'
import {Map, fromJS} from 'immutable'

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
            <ListItem
                elem={user.get('profile') || fromJS({})}
                baseUrl={'users'}
                key={user.get('id')}
                id={user.get('id')}
                name={user.get('name')}
            >
            </ListItem>
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
                    <div>
                        <h2>Members</h2>
                        <ul className="list">
                            {data.valueSeq().toArray().map(this.renderUser)}
                        </ul>
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