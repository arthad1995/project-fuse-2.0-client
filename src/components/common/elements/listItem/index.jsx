import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

require('./style.scss')

class ListItem extends Component {
    constructor(props){ super(props)}

    render(){
        const baseUrl = '/' + this.props.baseUrl
        return (
            <Link to={baseUrl + '/' + this.props.id}>
            <li className='listItem'>
                <div className="name">
                    {this.props.name}
                </div>
                <div className="buttons">
                    <div className="btn tone1-4-color">
                        View
                    </div>
                    {this.props.children}
                </div>
            </li>
            </Link>
        )
    }
}

export default ListItem