import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from '../../elements/listItem'
import { Link } from 'react-router-dom'
import { stopEvent } from '../../elements/stopEvent'
import SearchInput from 'react-search-input'
import { fromJS } from 'immutable'
import Pagination from 'react-js-pagination'

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
        const data = (this.props.search &&
                        this.props.search.get('data') &&
                        this.props.search.get('data').get('items')) ?
                            this.props.search.get('data').get('items').toObject() :
                            null
        const applicationHeadline = this.props.applicationHeadline || "Application Submitted!"
        const applicationSummary = this.props.applicationSummary || "Your application was submitted succesfully!"

        const doSearch = this.doSearch
        const results = this.props.search
        const numItems = results.get('totalItems')
        const pageSize = results.get('pageSize');
        const numPages = numItems / numPages;
        const nextPage = numItems > results.get('end') + 1;
        const prevPage = results.get('start') - 1 > 0;
        const pageChange = ((page)=>{
            page--
            this.props.dispatch({type: this.props.name + '_SET_PAGE', page})
            globalSearch({ query: this.props.global_search.get('search'), page })
            window.scrollTo(0,80)
        }).bind(this)

        let content = <div className="loading"></div>
        if (data && Object.keys(data).length) {
            content = (
                <div>
                    <div>
                        <ul className='list'>
                            {Object.keys(data).map((id) => {
                                let elem = data[id]
                                const owner = elem.get('owner') ? fromJS({
                                    name: elem.get('owner'),
                                    id: elem.get('owner_id')
                                }) : null
                                const Btn = (this.props.apply) ? this.props.apply(elem, this.props.dispatch) : null
                                return <ListItem
                                    key={id}
                                    handleSearchChange={doSearch}
                                    baseUrl={this.props.index}
                                    id={elem.get('id')}
                                    elem={elem}
                                    owner={owner}
                                    defaultProfileImg={
                                        this.props.index === 'projects' ? 'project_profile_icon.svg' :
                                            this.props.index === 'organizations' ? 'org_profile_icon.svg' :
                                                'profile_icon.svg'
                                    }
                                >
                                    {(this.props.buttons) ? (this.props.buttons(elem)) : ''}
                                    {(Btn) ? <Btn /> : ''}
                                </ListItem>
                            })}
                            {results.get('fetching') ? <div className="loading"></div> : ''}
                        </ul>
                        {numItems > pageSize ?
                            <Pagination
                                activePage={results.get('page') + 1}
                                itemsCountPerPage={pageSize}
                                totalItemsCount={numItems}
                                pageRangeDisplayed={5}
                                onChange={pageChange}
                            >
                            </Pagination> : ''}
                    </div>
                </div>
            )
        } else if (!this.props.search.get('fetching') || this.props.search.get('fetched')) {
            content = (
                <div>
                    {this.props.notFoundMsg || "No Results"}
                </div>
            )
        }
        return <div>
            <SearchHeader value={this.props.local_search} handleSearchChange={this.doSearch} />
            {content}
        </div>
    }
}

export default Page