import {TabbedSearchSidebar} from '../sidebars/search'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {listGenerator, Tabs} from '../elements/tabs'

var cache = {}

export const MyListOfPage= (paramObj) => {
    const url = paramObj.path
    const params = paramObj.param || {}
    const show_new = params.show_new
    if(cache[url]) return cache[url];

    const tabInfo = TabbedSearchSidebar(url, show_new)

    const mapStateToProps = (state) =>{
        let obj = {
            selected_tab: state.ui.get('selected_tab')
        }
        if (url !== 'friends') {
            obj[`my_${url}`] =state[`user_${url}`]
            obj[`applied_${url}`] =state[`applied_${url}`]
        } else {
            obj[`my_${url}`] = obj[`applied_${url}`] = state['friends']
        }
        return obj
    }

    @connect( mapStateToProps )
    class Page extends Component {
        constructor(props){ super(props)}

        componentDidMount(){
            if(this.props.load)
                this.props.load()
            else if(params.load)
                params.load()
        }

        render(){
            return (
                <Tabs selected_tab={this.props.selected_tab} generator={listGenerator(url)(Object.assign({}, this.props, params))} tabs={tabInfo.tabs} />
            )
        }
    }
    let ret = {page: Page, sidebar: tabInfo.sidebar}
    cache[url] = ret
    return ret
}
