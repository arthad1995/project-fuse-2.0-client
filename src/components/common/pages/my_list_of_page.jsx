import {TabbedSearchSidebar} from '../sidebars/search'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {listGenerator, Tabs} from '../elements/tabs'

var cache = {}

export const MyListOfPage= (url) => {
    if(cache[url]) return cache[url];

    const tabInfo = TabbedSearchSidebar(url)

    const mapStateToProps = (state) =>{
        let obj = {
            selected_tab: state.ui.get('selected_tab')
        }
        obj[`my_${url}`] =state[`user_${url}`]
        obj[`applied_${url}`] =state[`applied_${url}`]
        return obj
    }

    @connect( mapStateToProps )
    class Page extends Component {
        constructor(props){ super(props)}

        render(){
            return (
                <Tabs selected_tab={this.props.selected_tab} generator={listGenerator(url)(this.props)} tabs={tabInfo.tabs} />
            )
        }
    }
    let ret = {page: Page, sidebar: tabInfo.sidebar}
    cache[url] = ret
    return ret
}
