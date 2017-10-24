import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import tabs from './shared'
import {TabSidebar} from '../../common/tabs'

const mapStateToProps = (state) =>{
    return {
        selected_tab: state.ui.get('selected_tab')
    }
}

@connect( mapStateToProps )
class Sidebar extends Component {
    constructor(props){ super(props)}

    render(){
        return <TabSidebar tabs={tabs} />
    }
}

Sidebar.goTop = true;

export default Sidebar
