import React, {Component} from 'react'
import Menu from './menu'
import OnlineIndicator from './online_indicator'
import RouteHandling from '../routing/route_handling'
import { withRouter } from 'react-router'
import Footer from './footer'

require('./layout.scss')

@withRouter
export default class Layout extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <div>
                <Menu />
                <OnlineIndicator />
                <RouteHandling dispatch={this.props.dispatch} />
                <Footer />
            </div>
        )
    }
}
