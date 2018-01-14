import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { SidebarShell, CreateSidebar, SearchPageSidebar, MyListOfPage } from '../common'
import { HomeSidebar } from '../pages/home'
import { ProjectPageSidebar } from '../pages/project-page'
import { UserPageSidebar } from '../pages/user-page'
import { OrganizationPageSidebar } from '../pages/organization-page'
import findPagesParams from './find_pages_params'
import { loadUser, loadProject, loadTeam, loadOrganization, loadProjectSettings, loadTeamSettings, loadOrganizationSettings } from '../../actions/profile_page'
import routeBuilder from './route_builder'
import pages from './nested_page_info'

export class SidebarRouter extends Component {
    constructor(props) { super(props) }

    render() {
        
        let pos = this.props.pos || 'none'
        let sidebar_shell = SidebarShell(pos)

        const profilePageSidebars = [
            {path: 'projects', sidebar: ProjectPageSidebar, load: loadProject},
            {path: 'organizations', sidebar: OrganizationPageSidebar, load: loadOrganization},
            {path: 'users', sidebar: UserPageSidebar, load: loadUser}
        ]

        const routes = profilePageSidebars.map((pg) => routeBuilder({ rootPath: `/${pg.path}/:id`, rootComponent: sidebar_shell(pg.sidebar, pg.load)}))
        const search_routes = findPagesParams.map((pg) => routeBuilder({ rootPath: `/my-${pg.path}`, rootComponent: sidebar_shell(MyListOfPage(pg).sidebar)}))

        Object.keys(pages).forEach((pgkey) => {
            const page = pages[pgkey]
            page.forEach((pg, index) => {
                routes[index].add({path: pgkey})
            })
        })

        const final_routes = search_routes.map(route => route.build()).concat(routes.map(r => r.build()))
        console.log('sidebar router')

        return (
            <div>
                {final_routes}
                <Route exact path="/search" component={sidebar_shell(HomeSidebar, pos)} />
                <Route exact path="/" component={sidebar_shell(HomeSidebar, pos)} />
            </div>
        )
    }
}
