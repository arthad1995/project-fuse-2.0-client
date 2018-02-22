import React, {Component} from 'react'
import {change_tab} from '../../../actions/ui'
import {Link} from 'react-router-dom'
import {TabSidebar} from './tabs'
import { connect } from 'react-redux'
import ListItem from '../elements/listItem'
import { mapSingleKey } from '../mapping_helpers'
import { goBack } from 'react-router-redux'
import { fromJS } from 'immutable'

const mapStateToProps = (state) =>{
    return {
        selected_tab: state.ui.get('selected_tab'),
        user: state.user
    }
}

export const TabbedSearchSidebar = (url, show_new = true) => {
    const display_name = url[0].toUpperCase() + url.slice(1)
    let tabs = [
        {id: 1, name: `My ${display_name}`, arr_key: `my_${url}`},
        {id: 2, name: `Applied ${display_name}`, arr_key: `applied_${url}`},
        {id: 3, name: `Find ${display_name}`, arr_key: `search_${url}`, type: 'search'},
        {id: 4, name: `New ${display_name.slice(0, -1)}`, arr_key: `new_${url}`, type: 'new'},
    ]
    if(!show_new){
        tabs = tabs.slice(0,-1)
        tabs[1].name = `${display_name} Requests`
    }

    @connect( mapStateToProps )
    class TabSidebarSearchPage extends Component {
        render(){
            const dispatch = this.props.dispatch;

            const data = this.props.user.get('data') || fromJS({})
            const user = data.get('user') || fromJS({})
            const name = user.get('name') || ''

            const click_callback = this.props.onTabChange || ((target_tab) => ()=>{
                dispatch(change_tab(target_tab))
            })

            const selected_tab = this.props.selected_tab || 'tab1'

            const tabbed = (
                <div className="sub-section section">
                    <TabSidebar selected_tab={selected_tab} onTabChange={click_callback} tabs={tabs}>
                        {this.props.children}
                    </TabSidebar>
                </div>
            )

            return (
                <div>
                    <div className='section centered hideOnPhone'>
                        <h2>{`${name}`}</h2>
                    </div>
                    {url !== 'friends'?
                        <Link to='/my-friends'>
                            <div className='section centered'>
                                Friends
                            </div>
                        </Link> : tabbed
                    }
                    {url !== 'projects'?
                        <Link to='/my-projects'>
                            <div className='section centered'>
                                Projects
                            </div>
                        </Link> : tabbed
                    }
                    {url !== 'organizations'?
                        <Link to='/my-organizations'>
                            <div className='section centered'>
                                Organizations
                            </div>
                        </Link> : tabbed
                    }
                    <div onClick={() => this.props.history.push('/')} className="section centered pointer clickable">Home</div>
                </div>
            )
        }
    }
    TabSidebarSearchPage.goTop = true;
    return {sidebar: TabSidebarSearchPage, tabs}
}

export const SearchPageSidebar = (paramObj) => {
    let key = paramObj.path
    @connect(mapSingleKey(key))
    class Sidebar extends Component {
        constructor(props) { super(props) }

        render() {
            const data = this.props[key]
            return <div className="section centered">
                <input type='search' name='search' placeholder='Search' />
                <input type='Submit' className='sm-btn tone1-4-color' value='Search' />
            </div>
        }
    }
    return Sidebar
}