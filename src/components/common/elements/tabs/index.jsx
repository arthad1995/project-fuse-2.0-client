import React, {Component} from 'react'
import { connect } from 'react-redux'
import ListItem from '../listItem'

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
