import React, {Component} from 'react'
import { connect } from 'react-redux'
import ListItem from '../listItem'
import {Map} from 'immutable'

require('./style.scss')

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


export const listGenerator = (baseUrl) => (props) => (tab) => {
    props = props || {}
    const data = (props[tab.arr_key] && props[tab.arr_key].get('data')) ? props[tab.arr_key].get('data') : null
    return <div>
        <h3>{tab.name}</h3>
        <ul className='list'>
            {data ? data.mapEntries((elem, key)=>{
                elem = elem[1]
                const id = elem.get('id')
                return [<ListItem baseUrl={baseUrl} key={id} id={id} name={elem.get('name')} />]
            }) : 'No results'}
        </ul>
    </div>
}
