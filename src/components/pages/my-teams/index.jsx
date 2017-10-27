import React, {Component} from 'react'
import { connect } from 'react-redux'
import Sidebar from './sidebar'
import tabs from './shared'
import {listGenerator, Tabs} from '../../common/tabs'

const mapStateToProps = (state) =>{
    return {
        my_teams: state.user_teams.get('my_teams'),
        applied_teams: state.user_teams.get('applied_teams'),
        selected_tab: state.ui.get('selected_tab')
    }
}

@connect( mapStateToProps )
class MyTeams extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <Tabs generator={listGenerator('teams')(this.props)} tabs={tabs} />
        )
    }
}

export default MyTeams
export const MyTeamsSidebar = Sidebar