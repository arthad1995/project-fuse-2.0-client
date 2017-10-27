import React, {Component} from 'react'
import { Route, Switch } from 'react-router'
import {PageShell,SidebarShell} from '../common'
import NoMatch from './404'

import Home, {HomeSidebar} from '../pages/home' 
import MyProjects, {MyProjectsSidebar} from '../pages/my-projects'
import MyTeams, {MyTeamsSidebar} from '../pages/my-teams'
import MyOrganizations, {MyOrganizationsSidebar} from '../pages/my-organizations'
import ProjectPage, {ProjectPageSidebar} from '../pages/project-page'
import {ProjectSearchPage, ProjectSearchSidebar} from '../pages/project-search'
import OrganizationPage, {OrganizationPageSidebar} from '../pages/organization-page'
import {OrganizationSearchPage, OrganizationSearchSidebar} from '../pages/organization-search'
import OrganizationCreatePage, {OrganizationCreateSidebar} from '../pages/organization-create'
import {OrganizationStatsPage} from '../pages/organization-stats'

export class PageRouter extends Component {
    constructor(props){super(props)}

    render(){
        return (
            <Switch>
                <Route exact path="/" component={PageShell(Home)} />
                <Route exact path="/my-projects" component={PageShell(MyProjects)} />
                <Route exact path="/my-teams" component={PageShell(MyTeams)} />
                <Route exact path="/my-organizations" component={PageShell(MyOrganizations)} />
                <Route exact path="/organizations" component={PageShell(OrganizationSearchPage)} />
                <Route exact path="/organizations/new" component={PageShell(OrganizationCreatePage)} />
                <Route exact path="/organizations/:id/stats" component={PageShell(OrganizationStatsPage)} />
                <Route exact path="/organizations/:id" component={PageShell(OrganizationPage)} />
                <Route exact path="/projects/:id" component={PageShell(ProjectPage)} />
                <Route exact path="/projects" component={PageShell(ProjectSearchPage)} />
                <Route component={PageShell(NoMatch)} />
            </Switch>
        )
    }
}

export class SidebarRouter extends Component {
    constructor(props){super(props)}

    render(){
        const pos = this.props.pos || 'none'
        const sidebar_shell = SidebarShell(pos)
        return(
            <Switch>
                <Route exact path="/" component={sidebar_shell(HomeSidebar, pos)} />
                <Route exact path="/my-projects" component={sidebar_shell(MyProjectsSidebar, pos)} />
                <Route exact path="/my-teams" component={sidebar_shell(MyTeamsSidebar, pos)} />
                <Route exact path="/my-organizations" component={sidebar_shell(MyOrganizationsSidebar, pos)} />
                <Route exact path="/organizations" component={sidebar_shell(OrganizationSearchSidebar, pos)} />
                <Route exact path="/organizations/new" component={sidebar_shell(OrganizationCreateSidebar, pos)} />
                <Route path="/organizations/:id" component={sidebar_shell(OrganizationPageSidebar, pos)} />
                <Route exact path="/projects/:id" component={sidebar_shell(ProjectPageSidebar, pos)} />
                <Route exact path="/projects" component={sidebar_shell(ProjectSearchSidebar, pos)} />
            </Switch>
        )
    }
}
