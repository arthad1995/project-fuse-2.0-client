import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

export default class ErrorDisplay extends Component {
    constructor(props){ super(props)}

    render(){
        let errors = this.props.errors || Immutable.fromJS([])

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
