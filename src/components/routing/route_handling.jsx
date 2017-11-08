import React, {Component} from 'react'
import { withRouter } from 'react-router'
import TransitionGroup from "react-transition-group/TransitionGroup"

import {PageRouter, SidebarRouter} from './route_mapper'

@withRouter
export default class RouteHandling extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <main>
                <div className="pageBody">
                    <SidebarRouter pos="top" />
                    <PageRouter {...this.props} />
                    <SidebarRouter pos="bottom" />
                </div>
            </main>
        )
    }
}

