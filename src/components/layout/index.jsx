import React, {Component} from 'react'
import Menu from './menu'
import RouteHandling from './route_handling'
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
                <RouteHandling />
                <Footer />
            </div>
        )
    }
}
