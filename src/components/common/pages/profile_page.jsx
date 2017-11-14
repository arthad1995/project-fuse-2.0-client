import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../mapping_helpers'
const ReactMarkdown = require('react-markdown');

export const ProfilePage = (paramObj, notFoundMsg = 'Not Found') => {
    let key = paramObj.path

    @connect(mapSingleKey(key))
    class Page extends Component {
        constructor(props) { super(props) }

        componentDidMount() {
            if(this.props.load)
                this.props.load(this.props.match.params.id);
            else if(paramObj.param.load)
                paramObj.param.load(this.props.match.params.id);
        }

        render() {
            const params = this.props.match.params
            const data = this.props[key].get('data')
            const elem = (data) ? data.get(params.id) : null
            if (elem) {
                return (
                    <div>
                        <h1 className='title'>{elem.get('name')}</h1>
                        <div className='summary'>
                            {elem.get('summary') || ''}
                        </div>
                        <div className='description'>
                            <ReactMarkdown source={elem.get('content') || ''} />
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