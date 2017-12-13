import React from 'react'
import {Redirect} from 'react-router'

export default  user => Component => (props) => {
    if (user.size == 2 || !user.get('fetched'))
        return <Redirect to="/login" />
    return <Component {...props} />
}