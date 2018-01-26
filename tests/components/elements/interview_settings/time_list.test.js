import React from 'react'
import InterviewTimeList from './../../../../src/components/common/elements/interview_settings/interview_time_list'
import '../../test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'
const timezone_mock = require('timezone-mock');
timezone_mock.register('US/Pacific');

var context = {}
const range = n => [...Array(n).keys()]

describe("Interview Time List", ()=>{
    it('can mount', () => {
        const component = mount(
        <StaticRouter location="/" context={context}>
            <InterviewTimeList/>
        </StaticRouter>)
        expect(component.find('ul.interview_slots')).toHaveLength(1)
    })

    it('can convert from UTC', () => {
        const slots = [
            {
                start: '2017-12-25T23:25:32+00:00',
                end: '2017-01-01T09:32:59+00:00',
                __test_only:{
                    start: {
                        date: 'Dec 25th',
                        time: '3:25 PM'
                    },
                    end: {
                        date: 'Jan 1st',
                        time: '1:32 AM'
                    }
                }
            }
        ]

        const component = mount(
        <StaticRouter location="/" context={context}>
            <InterviewTimeList slots={slots} />
        </StaticRouter>)
        expect(component.find('ul.interview_slots')).toHaveLength(1)
        expect(component.find('li')).toHaveLength(slots.length)

        const elements = component.find('li')
        elements.forEach((elem, index) => {
            expect(elem.find('div.start div.date').text()).toBe(slots[index].__test_only.start.date)
            expect(elem.find('div.start div.time').text()).toBe(slots[index].__test_only.start.time)

            expect(elem.find('div.end div.date').text()).toBe(slots[index].__test_only.end.date)
            expect(elem.find('div.end div.time').text()).toBe(slots[index].__test_only.end.time)
        })
    })
})