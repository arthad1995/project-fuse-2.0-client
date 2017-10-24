import React, {Component} from 'react'
import { Route } from 'react-router'
import Sidebar from './sidebar'
import { withRouter } from 'react-router'
import TransitionGroup from "react-transition-group/TransitionGroup";
import {PageShell} from '../common'

import Home from '../pages/home' 
import MyProjects from '../pages/my-projects'
import MyTeams from '../pages/my-teams'
import MyOrganizations from '../pages/my-organizations'

@withRouter
export default class RouteHandling extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <main>
                <div className="pageBody">
                    <Sidebar pos="top" />
                    <div>
                        <Route exact path="/" component={PageShell(Home)} />
                        <Route exact path="/my-projects" component={PageShell(MyProjects)} />
                        <Route exact path="/my-teams" component={PageShell(MyTeams)} />
                        <Route exact path="/my-organizations" component={PageShell(MyOrganizations)} />
                    </div>
                    <Sidebar pos="bottom" />
                </div>
            </main>
        )
    }
}

