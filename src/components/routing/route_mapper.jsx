import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router'
import {PageShell,SidebarShell, SearchPage, CreateSidebar, SearchPageSidebar, ProfilePage, MyListOfPage, CreatePage} from '../common'
import NoMatch from './404'
import Home, {HomeSidebar} from '../pages/home' 
import ProjectPage, {ProjectPageSidebar} from '../pages/project-page'
import OrganizationPage, {OrganizationPageSidebar} from '../pages/organization-page'
import OrganizationCreatePage, {OrganizationCreateSidebar} from '../pages/organization-create'
import {OrganizationStatsPage} from '../pages/organization-stats'
import {LoginPage} from '../pages/login'
import {logout} from '../../actions/auth'

const pages = {
    my_: ['projects', 'teams', 'organizations'],
    create_: [{path:'organizations', param:'Organization'}, 
                      {path:'projects', param:'Project'}, 
                      {path:'teams', param:'Team'}]
}

const routeRenderFunc = Component => (props) => {
    return <Component {...props} />
}

const authUser = user => Component => (props) => {
    if(user.size == 2 || !user.get('fetched'))
        return <Redirect to="/login" />
    return <Component {...props} />
}

const authenticatedRouteGenerator = onEnterFunc => (path, component, key = false) => {
    if(key !== false){
        return <Route key={key} exact path={`/${path}`} render={onEnterFunc(component)} />
    }
    else{
        return <Route exact path={`/${path}`}  render={onEnterFunc(component)} />
    }
}

const makeRouteGenerator = authenticatedRoute => (prefix = '', suffix='') => Shell => (elem, index) => {
    let path = elem
    let param = elem
    if(typeof elem === 'object'){
        path = elem.path
        param = elem.param || path
    }
    return authenticatedRoute(prefix + path + suffix, Shell(param), index)
}

export class PageRouter extends Component {
    constructor(props){super(props)}

    render(){
        
        let authenticatedRoute = authenticatedRouteGenerator(authUser(this.props.user))
        let makeRoute = makeRouteGenerator(authenticatedRoute)

        let myListOfPage = makeRoute('my-')(e => PageShell(MyListOfPage(e).page))
        let searchPage = makeRoute()(e => PageShell(SearchPage(e)))
        let profilePage = makeRoute('', '/:id')(e => PageShell(ProfilePage(e)))
        let createPage = makeRoute('', '/new')(e => PageShell(CreatePage(e)))

        let dispatch = this.props.dispatch

        return (
            <Switch>
                <Route exact path="/login" component={PageShell(LoginPage)} />
                <Route exact path="/logout" render={() => {                    
                    logout()
                    return <Redirect to="/login" />
                }} />
                {authenticatedRoute('', PageShell(Home))}
                {pages.create_.map(createPage)}
                {authenticatedRoute('organizations/:id/stats', PageShell(OrganizationStatsPage))}
                {pages.my_.map(myListOfPage)}
                {pages.my_.map(searchPage)}
                {pages.my_.map(profilePage)}
                <Route component={PageShell(NoMatch)} />
            </Switch>
        )
    }
}

export class SidebarRouter extends Component {
    constructor(props){super(props)}

    render(){
        
        let authenticatedRoute = authenticatedRouteGenerator(routeRenderFunc)
        let makeRoute = makeRouteGenerator(authenticatedRoute)

        let pos = this.props.pos || 'none'
        let sidebar_shell = SidebarShell(pos) 
        let mySidebar = makeRoute('my-')(e => sidebar_shell(MyListOfPage(e).sidebar, pos))
        let sidebarSearch = makeRoute()(e => sidebar_shell(SearchPageSidebar(e), pos))
        let createSidebar = makeRoute('', '/new')(e => sidebar_shell(CreateSidebar(e), pos))

        return(
            <Switch>
                <Route exact path="/" component={sidebar_shell(HomeSidebar, pos)} />
                {pages.create_.map(createSidebar)}
                <Route exact path="/organizations/new" component={sidebar_shell(OrganizationCreateSidebar, pos)} />
                <Route path="/organizations/:id" component={sidebar_shell(OrganizationPageSidebar, pos)} />
                <Route exact path="/projects/:id" component={sidebar_shell(ProjectPageSidebar, pos)} />
                {pages.my_.map(mySidebar)}
                {pages.my_.map(sidebarSearch)}
            </Switch>
        )
    }
}
