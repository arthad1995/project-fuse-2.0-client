import React, {Component} from 'react'

require('./style.scss')

export default class Footer extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <div className='footer'>
                &copy; Team Fusion 2017
            </div>
        )
    }
}