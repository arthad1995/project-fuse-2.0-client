import React, {Component} from 'react'
import { connect } from 'react-redux'
import ListItem from '../listItem'
import {Map} from 'immutable'
import {AnimationHandler} from '../../../common'

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
                        {(`tab${tab.id}` === selected_tab)?  <AnimationHandler anim="SlideInTop" animKey='always'>{generator(tab)}</AnimationHandler> : null}
                </section>
                })}
            </div>
        )
    }
}


export const listGenerator = (baseUrl) => (props) => (tab = {}) => {
    props = props || {}
    const search_tab = props.search_tab || (() => null)
    const new_tab = props.new_tab || (() => null)

    switch(tab.type){
        case 'search':{
            const Tab = search_tab(tab)
            if(Tab)
                return <Tab {...props} />
            return Tab
            break;
        }
        case 'new': {
            const Tab =  new_tab(tab)
            if(Tab)
                return <Tab {...props} />
            return Tab
            break;
        }
        default: {
            const data = (props[tab.arr_key] && props[tab.arr_key].get('data')) ? props[tab.arr_key].get('data') : null
            return <div className="generated_list">
                    <h3>{tab.name}</h3>
                    <ul className='list'>
                        {(data && data.size > 0) ? data.valueSeq().toArray().map((elem)=>{
                            if(!elem) return null
                            const id = elem.get('id')
                            return <ListItem baseUrl={baseUrl} key={id} id={id} name={elem.get('name')} />
                        }) : 'No results'}
                    </ul>
                </div>
        }
    }
}
