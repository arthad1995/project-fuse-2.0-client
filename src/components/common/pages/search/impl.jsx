import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from '../../elements/listItem'
import { Link } from 'react-router-dom'
import {stopEvent} from '../../elements/stopEvent'
import {AnimationHandler} from '../../../common'

const SearchHeader = (props) => {
    return <div>
        <b>Find</b>
        <div className="inline">
            <input type='search' name='search' placeholder='Search' />
            <input type='Submit' className='sm-btn tone1-4-color' value='Search' />
        </div>
        <hr />
    </div>
}

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appliedTo: null
        }
    }

    componentDidMount() {
        if (this.props.load)
            this.props.load()
    }

    render() {
        if (this.props[this.props.index].get('fetching')) {
            return <div className="loading"></div>
        }

        const data = (this.props[this.props.index].get('data')) ? this.props[this.props.index].get('data').toObject() : null

        const applicationHeadline = this.props.applicationHeadline || "Application Submitted!"
        const applicationSummary = this.props.applicationSummary || "Your application was submitted succesfully!"

        if (data) {
            return (
                <AnimationHandler anim="SlideInTop" animKey='always'>
                    <SearchHeader />
                    <div id={`popup`} className="modalDialog" onClick={(e) => { document.getElementById(`popup`).classList.remove('show'); return false; }}>
                        <div onClick={(e) => {stopEvent(e); return false;}}>
                            <div className="modal_close" onClick={(e) => { document.getElementById(`popup`).classList.remove('show'); return false; }}></div>
                            <h2>{applicationHeadline}</h2>
                            <p>{applicationSummary}</p>
                        </div>
                    </div>
                    <div>
                        <ul className='list'>
                            {Object.keys(data).map((id) => {
                                let elem = data[id]
                                const Btn = (this.props.apply) ? this.props.apply(elem, this.props.dispatch) : null
                                return <ListItem key={id} baseUrl={this.props.index} id={id} name={elem.get('name')}>
                                    {(this.props.buttons) ? (this.props.buttons(elem)) : ''}
                                    {(Btn) ? <Btn /> : ''}
                                </ListItem>
                            })}
                        </ul>
                    </div>
                </AnimationHandler>
            )
        }
        else {
            return (
                <div><SearchHeader />
                    {this.props.notFoundMsg}
                </div>
            )
        }
    }
}

export default Page