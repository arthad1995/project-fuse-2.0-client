import React from 'react'
import Card from './../../../../src/components/common/elements/card'
import store from './../../../../src/store'
import '../../test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'

var context = {}

it('It can mount', () => {
    const component = mount(
    <StaticRouter location="/" context={context}>
        <Card store={store} />
    </StaticRouter>)
    const card_divs = component.find('div.card')
    expect(card_divs).toHaveLength(1)
})

it('It can accept properties', () => {
    const component = mount(
    <StaticRouter location="/" context={context}>
        <Card title="Test Title" store={store} />
    </StaticRouter>)
    expect(component.find('div.title').text()).toBe("Test Title")
})