const v = require('voca')
const moment = require('moment')

const ISO_format = "YYYY-MM-DDTHH:mm:ssZ"

export const parse_date = (date, format) => {
    if(!date) return null
    const momentDate = ((format)? moment(date, format) : moment(date))
    return momentDate
}

export const date_format = (date, format=ISO_format) => {
    return date.format(format)
}
