import React from 'react'
import Clock from './../../../../src/components/common/elements/clock'
import '../../test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'

var context = {}
const range = n => [...Array(n).keys()]

describe("Clock", ()=>{
    it('can mount', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <Clock />
        </StaticRouter>)
        expect(component.find('div.clock')).toHaveLength(1)
    })

    it('handles minutes', () => {
        range(120).forEach((i)=>{
            const component = mount(
            <StaticRouter location="/" context={context}>
                <Clock min={i} />
            </StaticRouter>)
            expect(component.find(`.min-${i % 60}`)).toHaveLength(1)
        })
    })
    
    it('handles hours', () => {
        range(48).forEach((i)=>{
            const component = mount(
            <StaticRouter location="/" context={context}>
                <Clock hr={i} />
            </StaticRouter>)
            expect(component.find(`.hr-${i % 12}`)).toHaveLength(1)
        })
    })
})