import {TabbedSearchSidebar} from '../../common/tabs'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {listGenerator, Tabs} from '../../common/tabs'

const tabInfo = TabbedSearchSidebar('projects')

const mapStateToProps = (state) =>{
    return {
        my_projects: state.user_projects.get('my_projects'),
        applied_projects: state.user_projects.get('applied_projects'),
        selected_tab: state.ui.get('selected_tab')
    }
}

@connect( mapStateToProps )
class MyProjects extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <Tabs generator={listGenerator('projects')(this.props)} tabs={tabInfo[1]} />
        )
    }
}

export default MyProjects
export const MyProjectsSidebar = tabInfo[0]