import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from '../../elements/listItem'
import { Link } from 'react-router-dom'
import { stopEvent } from '../../elements/stopEvent'
import SearchInput from 'react-search-input'
import { fromJS } from 'immutable'

const SearchHeader = (props) => {
    return <div>
        <SearchInput autoFocus value={props.value} className="search-input" onChange={props.handleSearchChange} /><hr />
    </div>
}

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appliedTo: null,
            lastText: ''
        }

        this.doSearch = this.doSearch.bind(this)
    }

    doSearch(text) {
        if (text !== this.state.lastText) {
            this.props.dispatch({
                type: 'CHANGE_LOCAL_SEARCH_TEXT',
                search_text: text
            })
            if (this.props.load)
                this.props.load({ query: text })
            this.setState({
                lastText: text
            })
        }
    }

    componentDidMount() {
        if (this.props.load)
            this.props.load({ query: '' })
    }

    render() {

        const data = (this.props.search && this.props.search.get('data')) ? this.props.search.get('data').toObject() : null

        const applicationHeadline = this.props.applicationHeadline || "Application Submitted!"
        const applicationSummary = this.props.applicationSummary || "Your application was submitted succesfully!"

        let content = <div className="loading"></div>
        if (!this.props.search.get('fetching') || this.props.search.get('fetched')) {
            if (data && Object.keys(data).length) {
                content = (
                    <div>
                        <div>
                            <ul className='list'>
                                {Object.keys(data).map((id) => {
                                    let elem = data[id]
                                    const owner = fromJS({
                                        name: elem.get('owner'),
                                        id: elem.get('owner_id')
                                    })
                                    const Btn = (this.props.apply) ? this.props.apply(elem, this.props.dispatch) : null
                                    return <ListItem key={id} baseUrl={this.props.index} id={id} elem={elem} owner={owner}>
                                        {(this.props.buttons) ? (this.props.buttons(elem)) : ''}
                                        {(Btn) ? <Btn /> : ''}
                                    </ListItem>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            } else {
                content = (
                    <div>
                        {this.props.notFoundMsg || "No Results"}
                    </div>
                )
            }
        }
        return <div>
            <SearchHeader value={this.props.local_search} handleSearchChange={this.doSearch} />
            {content}
        </div>
    }
}

export default Page