import {TabbedSearchSidebar} from '../../common/tabs'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {listGenerator, Tabs} from '../../common/tabs'

const tabInfo = TabbedSearchSidebar('organizations')

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
            <Tabs generator={listGenerator('organizations')(this.props)} tabs={tabInfo[1]} />
        )
    }
}

export default MyOrganizations
export const MyOrganizationsSidebar = tabInfo[0]