import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {change_tab, reset_tabs} from '../../../actions/ui'

const mapStateToProps = (state) =>{
    return {
        selected_tab: state.ui.get('selected_tab')
    }
}

@connect( mapStateToProps )
class Sidebar extends Component {
    constructor(props){ super(props)}
    
    componentWillMount(){
        this.props.dispatch(reset_tabs())
    }

    render(){
        const dispatch = this.props.dispatch;

        const click_callback = this.props.onTabChange || ((target_tab) => ()=>{
            dispatch(change_tab(target_tab))
        })

        const selected_tab = this.props.selected_tab || 'tab1'
        const tabs = [
            {id: 1, name: 'My Projects'},
            {id: 2, name: 'Applied Projects'}
        ]
        return (
                <div>
                    {tabs.map((tab)=>{
                        let id = tab.id
                        return <div key={id} className={'section centered pointer' + ((selected_tab === `tab${id}`)?' selected':'')}
                                onClick={click_callback(`tab${id}`)}>
                                {tab.name}
                            </div>
                    })}
                </div>
        )
    }
}

Sidebar.goTop = true;

export default Sidebar
