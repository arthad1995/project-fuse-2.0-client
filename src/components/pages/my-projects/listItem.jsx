import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class ListItem extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <Link to={'/projects/' + this.props.id}>
            <li>
                {this.props.name}
            </li>
            </Link>
        )
    }
}

export default ListItem
