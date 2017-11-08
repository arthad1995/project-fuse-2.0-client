import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from '../elements/listItem'
import { Link } from 'react-router-dom'
import { mapSingleKey } from '../mapping_helpers'
const ReactMarkdown = require('react-markdown');

export const SearchPage = (key, notFoundMsg = 'No Results') => {
    @connect(mapSingleKey(key))
    class Page extends Component {
        constructor(props) { super(props) }

        render() {
            const data = this.props[key].toObject()
            if (data && Object.keys(data).length > 2) {
                return (
                    <div>
                        <ul className='list'>
                            {Object.keys(data).map((id) => {
                                if (id === 'fetched' || id === 'fetching')
                                    return null;
                                const elem = data[id]
                                return <ListItem key={id} baseUrl={key} id={id} name={elem.get('name')}>
                                    <div className="btn green-color apply">
                                        Apply
                                </div>
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
