import React from 'react'
import ListItem from './../../../../src/components/common/elements/listItem'
import '../../test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'

var context = {}
const range = n => [...Array(n).keys()]

describe("List Item", ()=>{
    it('can mount', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <ListItem />
        </StaticRouter>)
        expect(component.find('li.listItem')).toHaveLength(1)
    })

    it('shows it\'s name', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <ListItem name="Bob" />
        </StaticRouter>)
        expect(component.find('li.listItem')).toHaveLength(1)
        expect(component.find('li.listItem > div.name').text()).toBe("Bob")
    })
    
    it('shows it\'s children', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <ListItem name="Joe" >
                <div className="this-is-a-test-class-name">
                    Test Content Only
                </div>
            </ListItem>
        </StaticRouter>)
        expect(component.find('li.listItem')).toHaveLength(1)
        expect(component.find('li.listItem > div.name').text()).toBe("Joe")
        expect(component.find('li.listItem > div.buttons > div.this-is-a-test-class-name').text()).toBe("Test Content Only")
    })
})