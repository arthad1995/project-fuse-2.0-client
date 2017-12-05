import {date_format, parse_date} from '../../src/utils/date_utils'
const timezone_mock = require('timezone-mock')

it('Date utils handle dates in MM/DD/YYYY', () => {
    timezone_mock.register('UTC')

    const format='MM/DD/YYYY'
    const date_tests = [
        {in: '01/01/2017', out: "2017-01-01T00:00:00.000+00:00"},
        {in: '12/31/2019', out: "2019-12-31T00:00:00.000+00:00"}
    ]

    date_tests.forEach((test)=>{
        expect(date_format(parse_date(test.in, format))).toBe(test.out)
    })
})

it('Date utils handle dates in MM/DD/YYYY HH:mma', () => {
    timezone_mock.register('UTC')

    const format='MM/DD/YYYY'
    const date_tests = [
        {in: '01/01/2017', out: "2017-01-01T00:00:00.000+00:00"},
        {in: '12/31/2019', out: "2019-12-31T00:00:00.000+00:00"}
    ]

    date_tests.forEach((test)=>{
        expect(date_format(parse_date(test.in, format))).toBe(test.out)
    })
})
