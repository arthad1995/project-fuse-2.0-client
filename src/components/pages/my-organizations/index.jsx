import React, {Component} from 'react'
import { connect } from 'react-redux'
import Sidebar from './sidebar'
import tabs from './shared'
import {listGenerator, Tabs} from '../../common/tabs'

const mapStateToProps = (state) =>{
    return {
        my_organizations: state.user_organizations.get('my_organizations'),
        applied_organizations: state.user_organizations.get('applied_organizations'),
        selected_tab: state.ui.get('selected_tab')
    }
}

@connect( mapStateToProps )
class MyOrganizations extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <Tabs generator={listGenerator('organizations')(this.props)} tabs={tabs} />
        )
    }
}

export default MyOrganizations
export const MyOrganizationsSidebar = Sidebar