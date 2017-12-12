import React from 'react'
import {Tabs,listGenerator} from './../../../../src/components/common/elements/tabs'
import '../../test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'
import {fromJS} from 'immutable'

var context = {}
const range = n => [...Array(n).keys()]

describe("Tabs", ()=>{
    it('can mount', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <Tabs />
        </StaticRouter>)
        expect(component.find('div.tabs')).toHaveLength(1)
    })

    it('Can Show Tabs', () => {
        const tabs = [
            {
                id:1,
                name: 'Bob'
            },
            {
                id:2,
                name: 'John'
            }
        ]

        const generator = (tab) => {
            return <div>{tab.name}</div>
        }

        const component = mount(
            <StaticRouter location="/" context={context}>
                <Tabs tabs={tabs} generator={generator} />
            </StaticRouter>)
        expect(component.find('#tab1_content').hasClass('visible')).toBeTruthy()
        expect(component.find('#tab1_content > div').text()).toBe(tabs[0].name)

        expect(component.find('#tab2_content').hasClass('hidden')).toBeTruthy()
        expect(component.find('#tab2_content > div').text()).toBe(tabs[1].name)
    })
})

describe('List Generator', ()=>{
    it('Works with emtpy input', ()=>{
        const generator = listGenerator('localhost')({})

        const Tab = generator()

        const component = mount(
            <StaticRouter location="/" context={context}>
                {Tab}
            </StaticRouter>)

        expect(component.find('div')).toHaveLength(1)
    })

    it('Works with non-empty input', ()=>{
        const generator = listGenerator('localhost')({})

        const Tab = generator({
            name: 'Test Tab'
        })

        const component = mount(
            <StaticRouter location="/" context={context}>
                {Tab}
            </StaticRouter>)

        expect(component.find('div')).toHaveLength(1)
        expect(component.find('div > h3').text()).toBe('Test Tab')
    })
    
        it('Works with non-empty input and props', ()=>{
            const generator = listGenerator('localhost')({
                elems: fromJS({
                    data: {
                        1: {
                            id: 1,
                            name: 'Bob'
                        }
                    }
                })
            })
    
            const Tab = generator({
                name: 'Test Tab',
                arr_key: 'elems'
            })
    
            const component = mount(
                <StaticRouter location="/" context={context}>
                    {Tab}
                </StaticRouter>)
    
            expect(component.find('div.generated_list')).toHaveLength(1)
            expect(component.find('div.generated_list > h3').text()).toBe('Test Tab')
            expect(component.find('li.listItem > div.name').text()).toBe('Bob')
        })
})
