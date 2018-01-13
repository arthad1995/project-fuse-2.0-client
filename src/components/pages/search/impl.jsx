import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../../common'
import { List } from 'immutable'
import { stopEvent } from '../../common'
import mockData from '../../../mock_data'
import SearchInput from 'react-search-input'
import { globalSearch } from '../../../actions/search'
import { fromJS } from 'immutable'
import { CardImg } from '../../common'
import InfiniteScroll from 'react-infinite-scroller'

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
        globalSearch({ query: this.props.global_search.get('search') })
    }

    handleSearchChange(text) {
        this.props.dispatch({
            type: 'CHANGE_GLOBAL_SEARCH_TEXT',
            search_text: text
        })
        globalSearch({ query: this.props.global_search.get('search') })
    }

    render() {
        const history = this.props.history
        const showUser = (user, index) => {
            const navTo = () => {
                if (history) {
                    history.push(`/users/${user.id}`)
                }
            }
            const skills = (user.skills) ? user.skills : []
            return (
                <CardImg
                    key={index}
                    title={`${user.name}`}
                    footer={<div className="smallText">(Person)</div>}
                    className="light pointer"
                    onClick={navTo}
                >
                    <div className="searchResult">
                        <div className="label">Headline:</div>
                        <div>{user.headline || "(None)"}</div>
                        {(skills.length) ?
                            <div className="skills">
                                <ul>
                                    {skills.map((skill, i) => {
                                        return <li key={`${index}_${i}`}>{skill}</li>
                                    })}
                                </ul>
                            </div>
                            : <div className="skills"><i>No Skills Listed</i></div>}
                    </div>
                </CardImg>
            )
        }
        const showOrg = (org, index) => {
            const navTo = () => {
                if (history) {
                    history.push(`/organizations/${org.id}`)
                }
            }
            return (
                <CardImg
                    key={index}
                    title={`${org.name}`}
                    footer={<div className="smallText">(Organization)</div>}
                    className="light pointer"
                    onClick={navTo}
                >
                    <div className="searchResult">
                        <div className="label">Headline:</div>
                        <div>{org.headline || "(None)"}</div>
                    </div>
                </CardImg>
            )
        }
        const showProj = (proj, index) => {
            const navTo = () => {
                if (history) {
                    history.push(`/projects/${proj.id}`)
                }
            }
            return (
                <CardImg
                    key={index}
                    title={`${proj.name}`}
                    footer={<div className="smallText">(Project)</div>}
                    className="light pointer"
                    onClick={navTo}
                >
                    <div className="searchResult">
                        <div className="label">Headline:</div>
                        <div>{proj.headline || "(None)"}</div>
                    </div>
                </CardImg>
            )
        }
        const data = ((this.props.results.get('data') || fromJS({})).get('data') || fromJS([])).filter(
            d => d.get('index') !== 'team'
        ).toJS()

        return (
            <div>
                {!this.props.global_search.get('show') ?
                    <div className="minorPadding">
                        <SearchInput className="search-input" value={this.props.global_search.get('search')} onChange={this.handleSearchChange} />
                        <hr />
                    </div>
                    : ''}
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => { }}
                    hasMore={false}
                    loader={<div className="loading"></div>}
                >
                    {data.map((result, index) => {
                        switch (result.index) {
                            case 'users':
                                return showUser(result, index)
                            case 'organizations':
                                return showOrg(result, index)
                            case 'projects':
                                return showProj(result, index)
                            default: ''
                        }
                    })}
                </InfiniteScroll>
                {data.length == 0 ? <div>No Results</div> : ''}
            </div>
        )
    }
}

export default Search
