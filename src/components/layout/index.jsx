import React, {Component} from 'react'
import Menu from './menu'
import RouteHandling from '../routing/route_handling'
import { withRouter } from 'react-router'
import Footer from './footer'
import {connect} from 'react-redux'

require('./layout.scss')

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

@withRouter
@connect(mapStateToProps)
export default class Layout extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <div>
                <Menu />
                <RouteHandling dispatch={this.props.dispatch} user={this.props.user} />
                <Footer />
            </div>
        )
    }
}
