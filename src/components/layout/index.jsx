import React, {Component} from 'react'
import Menu from './menu'
import { withRouter } from 'react-router'
import {Async} from '../common'

const OnlineIndicator = () => <Async load={import('./online_indicator')} ><span /></Async>
const RouteHandling = (props) => <Async load={import('../routing/route_handling')} {...props}/>
const Footer = () => <Async load={import('./footer')}><span /></Async>

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
