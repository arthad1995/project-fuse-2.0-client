import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from '../elements/listItem'
import { Link } from 'react-router-dom'
import { mapSingleKey } from '../mapping_helpers'
const ReactMarkdown = require('react-markdown');

export const SearchPage = (paramObj, notFoundMsg = 'No Results') => {
    let key = paramObj.path
    paramObj.param = paramObj.param || {}
    @connect(mapSingleKey(key))
    class Page extends Component {
        constructor(props) { 
            super(props) 
        }

        componentDidMount() {
            if(this.props.loadUsers)
                this.props.loadUsers();
            else if(paramObj.param.func)
                paramObj.param.func();
        }

        render() {
            const data = (this.props[key].get('data')) ? this.props[key].get('data').toObject() : null
            if (data) {
                return (
                    <div>
                        <ul className='list'>
                            {Object.keys(data).map((id) => {
                                let elem = data[id]
                                return <ListItem key={id} baseUrl={key} id={id} name={elem.get('name')}>
                                {(paramObj.param.buttons) ? (paramObj.param.buttons(elem)) : <div className="btn green-color apply">Apply</div>}
                                </ListItem>
                            })}
                        </ul>
                    </div>
                )
            }
            else {
                return (<div><h1>{notFoundMsg}</h1></div>)
            }
        }
    }
    return Page
}
