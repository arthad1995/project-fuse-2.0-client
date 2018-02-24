import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'
import { Link } from 'react-router-dom'
const ReactMarkdown = require('react-markdown');
import { AnimationHandler, ListItem, stopEventWrapper } from '../../../common'
import {Map, fromJS} from 'immutable'
import {
    grantAdminAccess,
    revokeAdminAccess,
    grantCreateAccess,
    revokeCreateAccess,
    kickMember
} from '../../../../actions/members'
import Cookies from 'js-cookie'
import v from 'voca'

class Page extends Component {
    constructor(props) {
        super(props)
        this.renderRelationship = this.renderRelationship.bind(this)
        this.showUserActions = this.showUserActions.bind(this)
        this.load = this.load.bind(this)
    }

    componentDidMount() {
        this.load()
    }

    load() {
        if (this.props.load)
            this.props.load(this.props.match.params.id)
    }

    renderRelationship(canEdit){
        const showUserActions = this.showUserActions
        return function(relationship){
            if(!relationship.get('user')) {
                return null;
            }
            return (
                <ListItem
                    elem={relationship.get('user').get('profile') || fromJS({})}
                    baseUrl={'users'}
                    key={relationship.get('user').get('id')}
                    id={relationship.get('user').get('id')}
                    name={relationship.get('user').get('name')}
                    arr={relationship.get('roles')}
                    arrText={'Roles: '}
                >
                {canEdit ? showUserActions(relationship) : null}
                </ListItem>
            )
        }
    }

    render() {
        if (this.props['members'].get('fetching')) {
            return <div className="loading"></div>
        }
        const params = this.props.match.params
        const data = this.props['members'].get('data')
        const editBtn = (this.props.canEdit && this.props.canEdit(this.props, elem) ? <div className='edit-btn'><Link to={`/${this.props.index}/${params.id}/edit`}><i className='fas fa-pencil-alt'></i></Link></div> : '')
        const customElems = this.props.customElems || (e =>null)

        const canEdit = (this.props.edit_obj || {}).canEdit || false

        if (data) {
            return (
                <AnimationHandler anim="SlideInTop" animKey='always'>
                    <div>
                        <h2>Members</h2>
                        <ul className="list">
                            {data.map(this.renderRelationship(canEdit))}
                        </ul>
                    </div>
                </AnimationHandler>
            )
        }
        else {
            return (<div><h1>{this.props.notFoundMsg}</h1></div>)
        }
    }

    showUserActions(relationship) {
        const ownerId = ((this.props.edit_obj || {}).owner || {}).id;
        const isOwner = ownerId && ownerId === Cookies.get('ID')
        const roles = (relationship.get('roles') || fromJS([])).map(item => v.lowerCase(item))
        const groupType = (this.props.edit_obj || {}).groupType
        const nestedProjects = groupType === 'Organization'
        let actions = []

        if (-1 !== roles.indexOf('owner')) {
            return null
        }

        const grantColor = 'tone1-3-color'
        const revokeColor = 'tone2-3-color'
        const grantClass = `btn ${grantColor}`
        const revokeClass = `btn ${revokeColor}`

        if(-1 !== roles.indexOf('admin')) {
            actions.push(<div
                    key={'admin-revoke'}
                    onClick={stopEventWrapper(
                        revokeAdminAccess(
                            groupType,
                            this.props.match.params.id,
                            relationship.get('user').get('id')
                        )
                    )}
                    className={revokeClass}
                >
                    Revoke Admin Access
                </div>)
        } else {
            actions.push(<div
                    key={'admin-grant'}
                    className={grantClass}
                    onClick={stopEventWrapper(
                        grantAdminAccess(
                            groupType,
                            this.props.match.params.id,
                            relationship.get('user').get('id')
                        )
                    )}
                >
                    Grant Admin Access
                </div>)
            if(nestedProjects){
                if (-1 !== roles.indexOf('can_create_projects')) {
                    actions.push(<div
                            key={'project-revoke'}
                            className={revokeClass}
                            onClick={stopEventWrapper(
                                revokeCreateAccess(
                                    this.props.match.params.id,
                                    relationship.get('user').get('id')
                                )
                            )}
                        >
                            Revoke Project Create Access
                        </div>)
                } else {
                    actions.push(<div
                            key={'project-grant'}
                            className={grantClass}
                            onClick={stopEventWrapper(
                                grantCreateAccess(
                                    this.props.match.params.id,
                                    relationship.get('user').get('id')
                                )
                            )}
                        >
                            Grant Project Create Access
                        </div>)
                }
            }
        }

        actions.push(<div
            key={'kick'}
            className={revokeClass}
            onClick={stopEventWrapper(
                kickMember(
                    groupType,
                    this.props.match.params.id,
                    relationship.get('user').get('id')
                )
            )}
        >
            Kick
        </div>)

        return actions
    }
}

export default Page