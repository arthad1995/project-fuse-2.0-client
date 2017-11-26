import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { PageShell, SidebarShell, SearchPage, CreateSidebar, SearchPageSidebar, ProfilePage, MyListOfPage, CreatePage, ApplyButton } from '../common'
import NoMatch from './404'
import Home, { HomeSidebar } from '../pages/home'
import { ProjectPageSidebar } from '../pages/project-page'
import { TeamPageSidebar } from '../pages/team-page'
import { UserPageSidebar } from '../pages/user-page'
import { OrganizationPageSidebar } from '../pages/organization-page'
import { OrganizationCreateSidebar } from '../pages/organization-create'
import { OrganizationStatsPage } from '../pages/organization-stats'
import { LoginPage } from '../pages/login'
import { RegisterPage } from '../pages/register'
import { logout } from '../../actions/auth'
import { searchUsers, searchProjects, searchTeams, searchOrganizations } from '../../actions/search'
import { loadUser, loadProject, loadTeam, loadOrganization } from '../../actions/profile_page'
import { createProject, createTeam, createOrganization } from '../../actions/create'
import { updateProject, updateTeam, updateOrganization, updateCurrentUser } from '../../actions/update'
import {ProjectSettings, ProjectSettingsSidebar} from '../pages/project-settings'
import {TeamSettings, TeamSettingsSidebar} from '../pages/team-settings'
import {OrganizationSettings, OrganizationSettingsSidebar} from '../pages/organization-settings'

const createArray = (paths, params) => {
    let res = []
    for (let i = 0; i < paths.length; ++i) {
        res.push({ path: paths[i], param: params[i] })
    }
    return res
}

const __pages = ['projects', 'teams', 'organizations', 'users']

const no_buttons = (e) => <span></span>

const pages = {
    my_: __pages,
    search: createArray(__pages, [
        { apply: ApplyButton('projects'),  load: searchProjects }, 
        { apply: ApplyButton('teams'),  load: searchTeams }, 
        { apply: ApplyButton('organizations'),  load: searchOrganizations }, 
        { apply: ApplyButton('users'),  load: searchUsers, buttons: no_buttons }
    ]),
    profiles: createArray(__pages, [
        { canEdit: () => true,  load: loadProject }, 
        { canEdit: () => true,  load: loadTeam }, 
        { canEdit: () => true,  load: loadOrganization }, 
        { canEdit: () => true,  load: loadUser }
    ]),
    create_: createArray(__pages.slice(0, __pages.length - 1), [
        { name: 'Project', save: createProject },
        { name: 'Team', save: createTeam },
        { name: 'Organization', save: createOrganization }
    ]),
    update_: createArray(__pages, [
        { name: 'Project',              save: updateProject,             load: loadProject },
        { name: 'Team',                  save: updateTeam,                load: loadTeam },
        { name: 'Organization',   save: updateOrganization, load: loadOrganization },
        { name: 'Profile',               save: updateCurrentUser,   load: loadUser },
    ])
}

const routeRenderFunc = Component => (props) => {
    return <Component {...props} />
}

const authUser = user => Component => (props) => {
    if (user.size == 2 || !user.get('fetched'))
        return <Redirect to="/login" />
    return <Component {...props} />
}

const authenticatedRouteGenerator = onEnterFunc => (path, component, key = false) => {
    if (key !== false) {
        return <Route key={key} exact path={`/${path}`} render={onEnterFunc(component)} />
    }
    else {
        return <Route exact path={`/${path}`} render={onEnterFunc(component)} />
    }
}

const makeRouteGenerator = authenticatedRoute => (prefix = '', suffix = '') => Shell => (elem, index) => {
    let path = elem
    let param = elem
    if (typeof elem === 'object') {
        path = elem.path
    }
    return authenticatedRoute(prefix + path + suffix, Shell(elem), index)
}

export class PageRouter extends Component {
    constructor(props) { super(props) }

    render() {
        let authenticatedRoute = authenticatedRouteGenerator(authUser(this.props.user))
        let makeRoute = makeRouteGenerator(authenticatedRoute)

        let myListOfPage = makeRoute('my-')(e => PageShell(MyListOfPage(e).page))
        let searchPage = makeRoute()(e => PageShell(SearchPage(e)))
        let profilePage = makeRoute('', '/:id')(e => PageShell(ProfilePage(e)))
        let createPage = makeRoute('', '/new')(e => PageShell(CreatePage(e)))
        let updatePage = makeRoute('', '/:id/edit')(e => PageShell(CreatePage(e)))

        let dispatch = this.props.dispatch

        return (                
            <Switch>
                <Route exact path="/login" component={PageShell(LoginPage)} />
                <Route exact path="/register" component={PageShell(RegisterPage)} />
                <Route exact path="/logout" render={() => {
                    logout()
                    return <Redirect to="/login" />
                }} />
                {authenticatedRoute('', PageShell(Home))}
                {pages.create_.map(createPage)}
                {pages.update_.map(updatePage)}
                {authenticatedRoute('organizations/:id/stats', PageShell(OrganizationStatsPage))}
                {pages.my_.map(myListOfPage)}
                {pages.search.map(searchPage)}
                {pages.profiles.map(profilePage)}
                {authenticatedRoute('projects/:id/settings', PageShell(ProjectSettings({ load: loadProject })))}
                {authenticatedRoute('teams/:id/settings', PageShell(TeamSettings({ load: loadTeam })))}
                {authenticatedRoute('organizations/:id/settings', PageShell(OrganizationSettings({ load: loadOrganization })))}
                <Route component={PageShell(NoMatch)} />
            </Switch>
        )
    }
}

export class SidebarRouter extends Component {
    constructor(props) { super(props) }

    render() {

        let authenticatedRoute = authenticatedRouteGenerator(routeRenderFunc)
        let makeRoute = makeRouteGenerator(authenticatedRoute)

        let pos = this.props.pos || 'none'
        let sidebar_shell = SidebarShell(pos)
        let mySidebar = makeRoute('my-')(e => sidebar_shell(MyListOfPage(e).sidebar, pos))
        let sidebarSearch = makeRoute()(e => sidebar_shell(SearchPageSidebar(e), pos))
        let createSidebar = makeRoute('', '/new')(e => sidebar_shell(CreateSidebar(e), pos))
        let updateSidebar = makeRoute('', '/:id/edit')(e => sidebar_shell(CreateSidebar(e), pos))

        return (
            <Switch>
                <Route exact path="/" component={sidebar_shell(HomeSidebar, pos)} />
                {pages.create_.map(createSidebar)}
                <Route exact path="/projects/:id/settings" component={sidebar_shell(ProjectPageSidebar, pos)} />
                <Route exact path="/organizations/:id/settings" component={sidebar_shell(OrganizationPageSidebar, pos)} />
                <Route exact path="/teams/:id/settings" component={sidebar_shell(TeamPageSidebar, pos)} />
                
                <Route path="/organizations/:id" component={sidebar_shell(OrganizationPageSidebar, pos)} />
                <Route path="/projects/:id" component={sidebar_shell(ProjectPageSidebar, pos)} />
                <Route path="/users/:id" component={sidebar_shell(UserPageSidebar, pos)} />
                <Route path="/teams/:id" component={sidebar_shell(TeamPageSidebar, pos)} />
                {pages.my_.map(mySidebar)}
                {pages.my_.map(sidebarSearch)}
            </Switch>
        )
    }
}
