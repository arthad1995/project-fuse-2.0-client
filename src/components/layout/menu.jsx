import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

@connect(mapStateToProps)
export default class Menu extends Component {
    constructor(props) { super(props) }

    render() {
        let user = this.props.user
        let shouldRenderUserItems = user.size > 2 && user.get('fetched')
        user = user.get('data')

        let restOfMenu = ''

        if (shouldRenderUserItems) {
            restOfMenu = (
                <ul className="menu">
                    <li>
                        <Link to={`/profile/${user.get('id')}`}>
                            <i className="icon fa fa-user"></i>
                        </Link>
                        <ul className="dropdown">
                            <Link to="/logout">
                                <li>
                                    Logout
                                </li>
                            </Link>
                        </ul>
                    </li>
                    <li>
                        <Link to="/"><i className="fa fa-bell"></i></Link>
                    </li>
                    <li>
                        <Link to="/"><i className="fa fa-envelope"></i></Link>
                    </li>
                    <li>
                        <Link to="/"><i className="fa fa-search"></i></Link>
                    </li>
                </ul>
            )
        }

        return (
            <div className="header">
                <Link to="/"><img src="/assets/images/project_fuse.svg" /></Link>
                {restOfMenu}
            </div>
        )
    }
}
