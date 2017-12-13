
import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { PageShell, ProfilePage, MyListOfPage } from '../common'
import Home from '../pages/home'
import { LoginPage } from '../pages/login'
import { RegisterPage } from '../pages/register'
import { logout } from '../../actions/auth'
import findPagesParams from './find_pages_params'
import __pages from './__pages'
import pages from './nested_page_info'
import profilePageParams from './profile_page_params'
import pageComponents from './page_components'
import authUser from './auth_user'
import routeBuilder from './route_builder'

export class PageRouter extends Component {
    constructor(props) { super(props) }

    render() {
        const preFunc = authUser(this.props.user)

        const routes = profilePageParams.map((pg) => routeBuilder({ rootPath: `/${pg.path}/:id`, rootComponent: PageShell(ProfilePage(pg)), preFunc}))
        const search_routes = findPagesParams.map((pg) => routeBuilder({ rootPath: `/my-${pg.path}`, rootComponent: PageShell(MyListOfPage(pg).page), preFunc}))

        Object.keys(pages).forEach((pgkey) => {
            const page = pages[pgkey]
            page.forEach((pg, index) => {
                routes[index].add({path: pgkey, component: PageShell(pageComponents[pgkey](pg))})
            })
        })

        const final_routes = routes.map((route) => route.build()).concat(search_routes.map(route => route.build()))

        let dispatch = this.props.dispatch

        return (
            <div>
                <Route exact path="/login" component={PageShell(LoginPage)} />
                <Route exact path="/register" component={PageShell(RegisterPage)} />
                <Route exact path="/logout" render={() => {logout(); return <Redirect to="/login" />}} />
                {final_routes}
                <Route exact path="/" render={authUser(this.props.user)(PageShell(Home))} />
            </div>
        )
    }
}