import React from 'react'
import Home, {HomeSidebar} from './../../src/components/pages/home'
import store from './../../src/store'
import './test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'

const userData = {
    id: 12,
    first_name: 'John',
    last_name: 'Doe',
    friend_count: 12
}

const feedData = [
    {
        id: 1,
        type: 'announcment',
        title: "Announcment for Jim's class",
        content: "Jim is offering free courses for juggling. Please contact Jim if you are interested."
    }
]

store.dispatch({
    type:'LOAD_USER_FULFILLED',
    payload: {
        data: userData
    }
})

store.dispatch({
    type:'LOAD_FEED_FULFILLED',
    payload: {
        data: {feed: feedData}
    }
})

var context = {}

it('home page feed renders correctly', () => {
    const home_feed = mount(
    <StaticRouter location="/" context={context}>
        <Home store={store} />
    </StaticRouter>)
    const cards = home_feed.find("div.card")

    expect(cards).toHaveLength(feedData.length)

    cards.forEach((node, index) => {
        let data = feedData[index]
        switch(data.type){
            case 'announcement':
                expect(node.contains('i.fa.fa-bullhorn')).toEqual(true)
                break
        }

        let title = node.find('div.title')
        expect(title).toHaveLength(1)
        expect(title.at(0).text()).toEqual(data.title)
        
        let content = node.find('div.content')
        expect(content).toHaveLength(1)
        expect(content.at(0).text()).toEqual(data.content)
    })
})

it('home page sidebar renders correctly', () => {
    const sidebar = mount(
    <StaticRouter location="/" context={context}>
        <HomeSidebar store={store} />
    </StaticRouter>)

    const sections = sidebar.find("div.section.centered")
    expect(sections).toHaveLength(5)

    // Name segment
    const name_section = sections.at(0)
    expect(name_section.find('h2')).toHaveLength(1)
    expect(name_section.find('h2').at(0).text())
        .toEqual(`${userData.first_name} ${userData.last_name}`)

    //Friend stats segment
    const friend_section = sections.at(1)
    expect(friend_section.find('div.num_friends')).toHaveLength(1)
    const friend_segment= friend_section.find('div.num_friends').at(0)
    expect(friend_segment.children()).toHaveLength(3)
    expect(friend_segment.childAt(0).text()).toEqual(`${userData.friend_count}`)
    expect(friend_segment.childAt(1).text()).toEqual('Friends')
    expect(friend_segment.childAt(2).text()).toEqual('Find more Friends')

})
