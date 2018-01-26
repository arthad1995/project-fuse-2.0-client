import React from 'react'
import Card from './../../../../src/components/common/elements/card'
import '../../test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'
//import store from './../../../../src/store'

var context = {}

describe("Card", ()=>{
    it('can mount', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <Card  />
        </StaticRouter>)
        const card_divs = component.find('div.card')
        expect(card_divs).toHaveLength(1)
    })

    it('can accept properties', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <Card title="Test Title"  content="This is test content" />
        </StaticRouter>)
        expect(component.find('div.title').text()).toBe("Test Title")
        expect(component.find('div.content').text()).toBe("This is test content")
    })

    it('has correct types', () =>{
        const types = [
            {
                key: 'announcement',
                icon: 'fa-bullhorn',
                color: 'tone1-5'
            },
            {
                key: 'reminder',
                icon: 'fa-bell',
                color: 'tone1-1'
            },
            {
                key: 'message',
                icon: 'fa-comment-alt',
                color: 'tone1-2'
            },
            {
                key: 'invite',
                icon: 'fa-plus-circle',
                color: 'tone1-2',
                funcs: true
            },
            {
                key: 'declined',
                icon: 'fa-times-circle',
                color: 'tone1-6'
            },
            {
                key: 'acceptance',
                icon: 'fa-check',
                color: 'tone1-4',
                footer: (props) => {
                    return [
                        <div className="nofloat" key="time">Your interview is scheduled for: {props.schedule}</div>,
                        <div className="nofloat" key="link"><Link to='/projects/1'>See Project</Link></div>
                    ]
                }
            },
            {
                key: 'info',
                icon: 'fa-info-circle',
                color: 'tone1-3'
            }
        ]

        types.forEach((type)=>{
            const title = `Testing ${type.key}`
            const content = `Icon: ${type.icon}, Color: ${type.color}`
            const component = mount(
            <StaticRouter location="/" context={context}>
                <Card title={title} type={type.key}  content={content} />
            </StaticRouter>)
            expect(component.find('div.title').text()).toBe(title)
            expect(component.find('div.content').text()).toBe(content)
            expect(component.find(`div.bubble.${type.color}-color`)).toHaveLength(1)
            expect(component.find(`i.${type.icon}`)).toHaveLength(1)
        })
    })
})