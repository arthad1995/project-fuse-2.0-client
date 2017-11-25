import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from '../elements/listItem'
import { Link } from 'react-router-dom'
import { mapSingleKey } from '../mapping_helpers'
import {stopEvent} from '../elements/stopEvent'
const ReactMarkdown = require('react-markdown');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export const SearchPage = (paramObj, notFoundMsg = 'No Results') => {
    let key = paramObj.path
    paramObj.param = paramObj.param || {}
    @connect(mapSingleKey(key))
    class Page extends Component {
        constructor(props) {
            super(props)
            this.state = {
                appliedTo: null
            }
        }

        componentDidMount() {
            if (this.props.load)
                this.props.load();
            else if (paramObj.param.load)
                paramObj.param.load();
        }

        render() {
            if (this.props[key].get('fetching')) {
                return <div className="loading"></div>
            }

            const data = (this.props[key].get('data')) ? this.props[key].get('data').toObject() : null
            if (data) {
                return (
                    <ReactCSSTransitionGroup
                        transitionAppear={true}
                        transitionAppearTimeout={400}
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={200}
                        transitionName="SlideInTop"
                    >
                        <div id={`popup`} className="modalDialog" onClick={(e) => { document.getElementById(`popup`).classList.remove('show'); return false; }}>
                            <div onClick={(e) => {stopEvent(e); return false;}}>
                                <div className="modal_close" onClick={(e) => { document.getElementById(`popup`).classList.remove('show'); return false; }}>X</div>
                                <h2>Application submitted!</h2>
                                <p>Your application was submitted succesfully!</p>
                            </div>
                        </div>
                        <div>
                            <ul className='list'>
                                {Object.keys(data).map((id) => {
                                    let elem = data[id]
                                    const Btn = (paramObj.param.apply) ? paramObj.param.apply(elem, this.props.dispatch) : null
                                    return <ListItem key={id} baseUrl={key} id={id} name={elem.get('name')}>
                                        {(paramObj.param.buttons) ? (paramObj.param.buttons(elem)) : ''}
                                        {(Btn) ? <Btn /> : ''}
                                    </ListItem>
                                })}
                            </ul>
                        </div>
                    </ReactCSSTransitionGroup>
                )
            }
            else {
                return (<div><h1>{notFoundMsg}</h1></div>)
            }
        }
    }
    return Page
}
