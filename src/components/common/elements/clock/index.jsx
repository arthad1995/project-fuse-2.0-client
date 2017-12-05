import React, {Component} from 'react'

require('./style.scss')

export default class Clock extends Component{
    render(){
        return <div className={`clock min-${this.props.min || 0} hr-${this.props.hr || 0}`}>
        </div>
    }
}
