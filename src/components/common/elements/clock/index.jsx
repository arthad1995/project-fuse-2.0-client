import React, {Component} from 'react'

export default class Clock extends Component{
    render(){
        const min = this.props.min || 0
        const hr = this.props.hr || 0
        return <div className={`clock min-${min % 60} hr-${hr % 12}`}>
        </div>
    }
}
