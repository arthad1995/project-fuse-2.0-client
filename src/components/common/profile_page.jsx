import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from './mapping_helpers'
const ReactMarkdown = require('react-markdown');

export const ProfilePage = (key, notFoundMsg = 'Not Found') => {
    @connect(mapSingleKey(key))
    class Page extends Component {
        constructor(props) { super(props) }

        render() {
            const params = this.props.match.params
            const data = this.props[key].get(params.id)
            if (data) {
                return (
                    <div>
                        <h1 className='title'>{data.get('name')}</h1>
                        <div className='summary'>
                            {data.get('summary')}
                        </div>
                        <div className='description'>
                            <ReactMarkdown source={data.get('content')} />
                        </div>
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