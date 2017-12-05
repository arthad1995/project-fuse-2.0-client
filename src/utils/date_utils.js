const v = require('voca')
const moment = require('moment')

const ISO_format = "YYYY-MM-DDTHH:mm:ssZ"

export const parse_date = (date, format=ISO_format) => {
    return (format)  ? moment(date, format) : moment(date)
}

export const date_format = (date, format=ISO_format)=>{
    return (format) ? date.format(format) : date.format()
}
