import React, {Component} from 'react'
import { withRouter } from 'react-router'
import TransitionGroup from "react-transition-group/TransitionGroup"
import {connect} from 'react-redux' 
import {PageRouter, SidebarRouter} from './route_mapper'

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
                    <SidebarRouter pos="top" />
                    <PageRouter {...this.props} />
                    <SidebarRouter pos="bottom" />
                </div>
            </main>
        )
    }
}

