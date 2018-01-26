import React from 'react'
import ErrorDisplay from './../../../../src/components/common/elements/error_display'
import '../../test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'
import {fromJS} from 'immutable'

var context = {}
const range = n => [...Array(n).keys()]

describe("Error Display", ()=>{
    it('can mount', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <ErrorDisplay />
        </StaticRouter>)
        expect(component.find('div.error')).toHaveLength(0)
    })

    it('can show errors', () => {
        const errors = fromJS([
            "Invalid Birthday",
            "Missing Phone Number",
            "Invalid Name"
        ])
        const component = mount(
        <StaticRouter location="/" context={context}>
            <ErrorDisplay errors={errors} />
        </StaticRouter>)
        expect(component.find('div.error')).toHaveLength(1)
        component.find('li').map((elem, index)=>{
            expect(elem.text()).toBe(errors.get(index))
        })
    })
})