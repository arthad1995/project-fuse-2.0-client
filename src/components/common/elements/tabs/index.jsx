import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from '../listItem'
import { Map } from 'immutable'
import { AnimationHandler, ApplyButton } from '../../../common'
import { AppliedStatus } from '../applied_status'
import {fromJS} from 'immutable'
import Cookies from 'js-cookie'
import {acceptFriend, declineFriend} from '../../../../actions/apply'

const id = parseInt(Cookies.get('ID'))

export class Tabs extends Component {
    constructor(props) { super(props) }

    render() {
        let dispatch = this.props.dispatch
        const base_class = 'tab-content '
        const selected_tab = this.props.selected_tab || 'tab1'
        const generator = this.props.generator
        const tabs = this.props.tabs || []
        return (
            <div className='tabs'>
                {tabs.map((tab) => {
                    return <section key={tab.id} id={`tab${tab.id}_content`} className={base_class + ((`tab${tab.id}` === selected_tab) ? 'visible' : 'hidden')}>
                        {(`tab${tab.id}` === selected_tab) ? <AnimationHandler anim="SlideInTop" animKey='always'>{generator(tab)}</AnimationHandler> : null}
                    </section>
                })}
            </div>
        )
    }
}

const isFriendList = data => {
    return (data && data.size && data.valueSeq().toArray()[0].get('sender') && data.valueSeq().toArray()[0].get('reciever'))
}

const normalItem = (tab, data, baseUrl) => {
    if (tab.arr_key.indexOf('applied_') === 0) {
        return <div className="generated_list">
            <h3>{tab.name}</h3>
            <ul className='list'>
                {(data && data.size > 0) ? data.valueSeq().toArray().map((elem) => {
                    if (!elem) return null
                    const group = elem.get('project') || elem.get('organization') || fromJS({})
                    const id = elem.get('id')
                    return <ListItem
                        elem={group.get('profile')}
                        owner={group.get('owner')}
                        baseUrl={baseUrl}
                        key={id}
                        id={group.get('id')}
                        name={group.get('name')}
                    >
                        <AppliedStatus status={elem.get('status')} />
                    </ListItem>
                    return null
                }) : 'No results'}
            </ul>
        </div>
    } else {
        return <div className="generated_list">
            <h3>{tab.name}</h3>
            <ul className='list'>
                {(data && data.size > 0) ? data.valueSeq().toArray().map((elem) => {
                    if (!elem) return null
                    const id = elem.get('id')
                    return <ListItem
                        owner={elem.get('owner')}
                        elem={elem.get('profile')}
                        baseUrl={baseUrl}
                        key={id}
                        id={id}
                        name={elem.get('name')}
                    />
                }) : 'No results'}
            </ul>
        </div>
    }
}

const friendItem = (tab, data) => {
    const isApplied = tab.arr_key.indexOf('applied_') === 0
    const acceptConstructor = ApplyButton([], ()=>'Accept', acceptFriend)
    const declineConstructor = ApplyButton([], ()=>'Ignore', declineFriend)
    data = data && data.size > 0 ? data.valueSeq().toArray().map(friendship => {
        const senderId = friendship.get('sender').get('id')
        const receiverId = friendship.get('receiver').get('id')
        const friend = (senderId === id) ? friendship.get('receiver') : friendship.get('sender')
        if (isApplied) {
            if (receiverId !== id || friendship.get('status') !== 'applied') {
                return null
            }
        } else {
            if (friendship.get('status') !== 'accepted') {
                return null
            }
        }
        const ButtonAccept = acceptConstructor(friendship)
        const ButtonDecline = declineConstructor(friendship)
        return (
            <ListItem
                baseUrl={'users'}
                id={friend.get('id')}
                img={friend.get('thumbnail_id')}
                name={friend.get('name')}
                elem={(friend.get('profile') || fromJS({})).set('skills', null)}
                key={friendship.get('id')}
            >
                {isApplied?<div><ButtonAccept /><ButtonDecline /></div> : null}
            </ListItem>
        )
    }).filter(d => d) : []
    return (
        <div className="generated_list">
            <h3>{tab.name}</h3>
            <ul className='list'>
                {data.length ? data : (isApplied ? 'No pending friend requests' : 'No friends yet')}
            </ul>
        </div>
    )
}

export const listGenerator = (baseUrl) => (props) => (tab = {}) => {
    props = props || {}
    const search_tab = props.search_tab || (() => null)
    const new_tab = props.new_tab || (() => null)

    switch (tab.type) {
        case 'search': {
            const Tab = search_tab(tab)
            if (Tab)
                return <Tab {...props} />
            return Tab
            break;
        }
        case 'new': {
            const Tab = new_tab(tab)
            if (Tab)
                return <Tab {...props} />
            return Tab
            break;
        }
        default: {
            const data = (props[tab.arr_key] && props[tab.arr_key].get('data')) ? props[tab.arr_key].get('data') : null
<<<<<<< HEAD
            return baseUrl == 'friends' ? friendItem(tab, data) : normalItem(tab, data, baseUrl)
=======
            return baseUrl == 'friends' ? friendItem(tab, data) : normalItem(baseUrl, tab, data)
>>>>>>> nested_integration
        }
    }
}
