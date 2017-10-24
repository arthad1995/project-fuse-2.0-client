import React, {Component} from 'react'
import { Route } from 'react-router'
import Home from '../pages/home' 
import Sidebar from './sidebar'
import { withRouter } from 'react-router'
import TransitionGroup from "react-transition-group/TransitionGroup";
import {PageShell} from '../common'

@withRouter
export default class RouteHandling extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <main>
                <div className="pageBody">
                    <div className="leftSidebar"><Sidebar /></div>
                    <div className="content">
                        <Route exact path="/" component={PageShell(Home)} />
                    </div>
                </div>
            </main>
        )
    }
}

