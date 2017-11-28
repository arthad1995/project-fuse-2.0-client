import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {fromJS} from 'immutable'

export default class ErrorDisplay extends Component {
    constructor(props){ super(props)}

    render(){
        let errors = this.props.errors || fromJS([])

        if(errors.size)
            return (
                <div className='error'>
                <ul>
                    {errors.map((err, index)=>{
                        return <li key={index}><div>{err}</div></li>
                    })}
                </ul>
            </div>
            )
        return ''
    }
}
