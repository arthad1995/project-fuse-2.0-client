import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {HomeSidebar} from '../pages/home'
import {SidebarShell} from '../common'
import { Route } from 'react-router'

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
        return (
            <div>
                <Route exact path="/" component={SidebarShell(HomeSidebar)} />
            </div>
        )
    }
}
