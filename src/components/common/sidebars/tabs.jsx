import React, {Component} from 'react'
import { connect } from 'react-redux'
import ListItem from '../elements/listItem'

export class TabSidebar extends Component {
    render(){
        const dispatch = this.props.dispatch;

        const click_callback = this.props.onTabChange || ((target_tab) => ()=>{})

        const selected_tab = this.props.selected_tab || 'tab1'
        const tabs = this.props.tabs || []

        return (
            <div>
                {tabs.map((tab)=>{
                    let id = tab.id
                    return <div key={id} className={'section centered pointer clickable' + ((selected_tab === `tab${id}`)?' selected':'')}
                            onClick={click_callback(`tab${id}`)}>
                            {tab.name}
                        </div>
                })}
                {this.props.children}
            </div>
        )
    }
}