import React, {Component} from 'react'
import { withRouter } from 'react-router'
import TransitionGroup from "react-transition-group/TransitionGroup"
import {connect} from 'react-redux'
import {PageRouter} from './page_router'
import {SidebarRouter} from './sidebar_router'

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

@withRouter
@connect(mapStateToProps)
export default class RouteHandling extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <main>
                <div className="pageBody">
                    { <SidebarRouter showRouterFix={this.props.showRouterFix} pos="top" /> }
                    <PageRouter {...this.props} />
                </div>
            </main>
        )
    }
}

