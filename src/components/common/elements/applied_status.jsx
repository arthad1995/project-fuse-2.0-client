import v from 'voca'
import React, {Component} from 'react'

export class AppliedStatus extends Component{
    render(){
        return <div className={`applied_status ${v.lowerCase(this.props.status)}`} />
    }
}

