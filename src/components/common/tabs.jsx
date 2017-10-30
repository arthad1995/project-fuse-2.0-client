import React, {Component} from 'react'
import { connect } from 'react-redux'
import Timestamp from 'react-timestamp'
import {change_tab} from '../../actions/ui'
import ListItem from './listItem'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) =>{
    return {
        selected_tab: state.ui.get('selected_tab')
    }
}

@connect( mapStateToProps )
export class Tabs extends Component {
    constructor(props){ super(props)}

    render(){
        let dispatch = this.props.dispatch
        const base_class = 'tab-content '
        const selected_tab = this.props.selected_tab || 'tab1'
        const generator = this.props.generator
        const tabs = this.props.tabs || []
        return (
            <div className='tabs'>
                {tabs.map((tab)=>{
                    return <section key={tab.id} id={`tab${tab.id}_content`} className={base_class + ((`tab${tab.id}` === selected_tab)? 'visible': 'hidden')}>
                    {generator(tab)}
                </section>
                })}
            </div>
        )
    }
}

@connect( mapStateToProps )
export class TabSidebar extends Component {
    render(){
        const dispatch = this.props.dispatch;

        const click_callback = this.props.onTabChange || ((target_tab) => ()=>{
            dispatch(change_tab(target_tab))
        })

        const selected_tab = this.props.selected_tab || 'tab1'
        const tabs = this.props.tabs || []

        return (
            <div>
                {tabs.map((tab)=>{
                    let id = tab.id
                    return <div key={id} className={'section centered pointer' + ((selected_tab === `tab${id}`)?' selected':'')}
                            onClick={click_callback(`tab${id}`)}>
                            {tab.name}
                        </div>
                })}
                {this.props.children}
            </div>
        )
    }
}

export const TabbedSearchSidebar = (url) => {
    const display_name = url[0].toUpperCase() + url.slice(1)
    const tabs = [
        {id: 1, name: `My ${display_name}`, arr_key: `my_${url}`},
        {id: 2, name: `Applied ${display_name}`, arr_key: `applied_${url}`}
    ]

    @connect( mapStateToProps )
    class TabSidebarSearchPage extends Component {
        render(){
            const dispatch = this.props.dispatch;

            const click_callback = this.props.onTabChange || ((target_tab) => ()=>{
                dispatch(change_tab(target_tab))
            })

            const selected_tab = this.props.selected_tab || 'tab1'

            return (
                <TabSidebar tabs={tabs}>
                    <Link to={"/" + url}>
                        <div className="section centered">
                            Find {display_name}
                        </div>
                    </Link>
                    <Link to={`/${url}/new`}>
                        <div className="section centered">
                            New {display_name.slice(0, -1)}
                        </div>
                    </Link>
                    {this.props.children}
                </TabSidebar>
            )
        }
    }
    TabSidebarSearchPage.goTop = true;
    return [TabSidebarSearchPage, tabs]
}

export const listGenerator = (baseUrl) => (props) => (tab) => {
    props = props || {}
    return <div>
        <h3>{tab.name}</h3>
        <ul className='list'>
            {(props[tab.arr_key]) ? props[tab.arr_key].map((elem)=>{
                const id = elem.get('id')
                if(elem)
                    return <ListItem baseUrl={baseUrl} key={id} id={id} name={elem.get('name')} />
                return ''
            }) : 'No results'}
        </ul>
    </div>
}
