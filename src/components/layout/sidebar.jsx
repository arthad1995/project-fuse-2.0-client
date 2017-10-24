import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {SidebarShell} from '../common'
import { Route } from 'react-router'
import {HomeSidebar} from '../pages/home'
import {MyProjectsSidebar} from '../pages/my-projects'
import {MyTeamsSidebar} from '../pages/my-teams'
import {MyOrganizationsSidebar} from '../pages/my-organizations'

const mapStateToProps = (state, ownProps) =>{
    return {
        page: ownProps.location
    }
}

@withRouter
@connect( mapStateToProps )
export default class Sidebar extends Component {
    constructor(props){ super(props)}

    render(){
        const pos = this.props.pos || 'none'
        return (
            <span>
                <Route exact path="/" component={SidebarShell(HomeSidebar, pos)} />
                <Route exact path="/my-projects" component={SidebarShell(MyProjectsSidebar, pos)} />
                <Route exact path="/my-teams" component={SidebarShell(MyTeamsSidebar, pos)} />
                <Route exact path="/my-organizations" component={SidebarShell(MyOrganizationsSidebar, pos)} />
            </span>
        )
    }
}
