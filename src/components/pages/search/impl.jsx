import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../../common'
import { List } from 'immutable'
import { stopEvent } from '../../common'
import mockData from '../../../mock_data'
import SearchInput from 'react-search-input'
import {globalSearch} from '../../../actions/search'
import {fromJS} from 'immutable'

const mapStateToProps = (state) => {
    return {
        global_search: state.ui.get('global_search'),
        results: state.search
    }
}

@connect(mapStateToProps)
class Search extends Component {
    constructor(props) {
        super(props)

        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    componentWillMount() {
        globalSearch({query: this.props.global_search.get('search')})
    }

    handleSearchChange(text) {
        this.props.dispatch({
            type: 'CHANGE_GLOBAL_SEARCH_TEXT',
            search_text: text
        })
        globalSearch({query: this.props.global_search.get('search')})
    }

    render() {
        const showUser = (user, index) => {
            return <div key={index}>
            <hr />
                <b>User</b><br/>
                <b>Name</b>: {user.get('name')}<br />
                <b>Email</b>: {user.get('email')}<br />
                <hr />
            </div>
        }
        const showOrg = (org, index) => {
            return <div key={index}>
            <hr />
                <b>Organization</b><br />
                <b>Name</b>: {org.get('name')}<br />
                <b>Headline</b>: {org.get('headline')}<br />
                <b>Summary</b>: {org.get('summary')}<br />
                <hr />
            </div>
        }
        const showProj = (proj, index) => {
            return <div key={index}>
                <hr />
                <b>Project</b><br />
                <b>Name</b>: {proj.get('name')}<br />
                <b>Headline</b>: {proj.get('headline')}<br />
                <b>Summary</b>: {proj.get('summary')}<br />
                <hr />
            </div>
        }
        const data = (this.props.results.get('data') || fromJS({})).get('data') || fromJS([])
        return (
            <div>
                <SearchInput className="search-input" value={this.props.global_search.get('search')} onChange={this.handleSearchChange} />
                {data.map((result, index) => {
                    switch(result.get('index')) {
                        case 'users':
                            return showUser(result, index)
                        case 'organizations':
                            return showOrg(result, index)
                        case 'projects':
                            return showProj(result, index)
                        default: ''
                    }
                })}
            </div>
        )
    }
}

export default Search
