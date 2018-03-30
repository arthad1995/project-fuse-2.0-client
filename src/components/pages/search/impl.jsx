import React, { Component } from 'react'
import { connect } from 'react-redux'
import { globalSearch } from '../../../actions/search'
import { addFriend, applyToOrganization, applyToProject } from '../../../actions/apply'
import { fromJS } from 'immutable'
import { CardImg, stopEvent } from '../../common'
import InfiniteScroll from 'react-infinite-scroller'
import Pagination from 'react-js-pagination'
import config from '../../../config'
import v from 'voca'

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
        globalSearch({ query: this.props.global_search.get('search'), page: this.props.results.get('page') })
    }

    handleSearchChange(text) {
        this.props.dispatch({
            type: 'CHANGE_GLOBAL_SEARCH_TEXT',
            search_text: text
        })
        this.props.dispatch({
            type: 'GLOBAL_SEARCH_INFO_SET_PAGE',
            page: 0
        })
        globalSearch({
            query: this.props.global_search.get('search'),
            page: 0
        })
    }

    render() {
        const history = this.props.history
        const handleSearchChange = this.handleSearchChange
        const dispatch = this.props.dispatch
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
                    title={<div>
                        <div className="img">
                            <img src={
                                (user.img ?
                                    config.host + '/files/download/' + user.img :
                                    '/assets/images/profile_icon.svg'
                                )
                            } />
                        </div>
                        <div className="name">{user.name} </div>
                        <div className="smallText">(User)</div>
                    </div>}
                    className="light pointer clickable"
                    onClick={navTo}
                >
                    <div className="searchResult">
                        <div>{user.headline || ""}</div>
                        {(skills.length) ?
                            <div className="skills--clickable">
                                <ul>
                                    {skills.map((skill, i) => {
                                        return <li key={`${index}_${i}`}
                                            onClick={(e) => {
                                                stopEvent(e)
                                                handleSearchChange(`in:users ${skill}`)
                                                return false;
                                            }}
                                        >{skill}</li>
                                    })}
                                </ul>
                            </div>
                            : <div className="skills"><i>No Skills Listed</i></div>}
                        <div className="buttons">
                            {user.actions_available === 'add' ?
                                <div
                                    className="btn tone1-1-color apply"
                                    onClick={e => {
                                        stopEvent(e)
                                        addFriend(fromJS(user))
                                            .catch(e => dispatch({
                                                type: 'ADD_ACTION_FOR_RESULT',
                                                payload: {
                                                    result: index,
                                                    action: "add"
                                                }
                                            }))
                                        dispatch({
                                            type: 'REMOVE_ACTION_FOR_RESULT',
                                            payload: {
                                                result: index
                                            }
                                        })
                                        return false
                                    }}
                                >
                                    Send Friend Request
                                </div>
                            : ''}
                        </div>
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
                    title={<div>
                        <div className="img">
                            <img src={
                                (org.img ?
                                    config.host + '/files/download/' + org.img :
                                    '/assets/images/profile_icon.svg'
                                )
                            } />
                        </div>
                        <div className="name">{org.name} </div>
                        <div className="smallText">(Organization)</div>
                    </div>}
                    className="light pointer"
                    onClick={navTo}
                >
                    <div className="searchResult">
                        <div className="label">Headline:</div>
                        <div>{org.headline || "(None)"}</div>
                        <div className="buttons">
                            {org.actions_available === 'join' || org.actions_available === 'apply' ?
                                <div
                                    className="btn tone1-1-color apply"
                                    onClick={e => {
                                        stopEvent(e)
                                        applyToOrganization(fromJS(org))
                                            .catch(e => dispatch({
                                                type: 'ADD_ACTION_FOR_RESULT',
                                                payload: {
                                                    result: index,
                                                    action: org.actions_available
                                                }
                                            }))
                                        dispatch({
                                            type: 'REMOVE_ACTION_FOR_RESULT',
                                            payload: {
                                                result: index
                                            }
                                        })
                                        return false
                                    }}
                                >
                                    {v.titleCase(org.actions_available)}
                                </div>
                            : ''}
                        </div>
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
                    title={<div>
                        <div className="img">
                            <img src={
                                (proj.img ?
                                    config.host + '/files/download/' + proj.img :
                                    '/assets/images/profile_icon.svg'
                                )
                            } />
                        </div>
                        <div className="name">{proj.name} </div>
                        <div className="smallText">(Project)</div>
                    </div>}
                    className="light pointer"
                    onClick={navTo}
                >
                    <div className="searchResult">
                        <div className="label">Headline:</div>
                        <div>{proj.headline || "(None)"}</div>
                        <div className="buttons">
                            {proj.actions_available === 'join' || proj.actions_available === 'apply' ?
                                <div
                                    className="btn tone1-1-color apply"
                                    onClick={e => {
                                        stopEvent(e)
                                        applyToProject(fromJS(proj))
                                            .catch(e => dispatch({
                                                type: 'ADD_ACTION_FOR_RESULT',
                                                payload: {
                                                    result: index,
                                                    action: proj.actions_available
                                                }
                                            }))
                                        dispatch({
                                            type: 'REMOVE_ACTION_FOR_RESULT',
                                            payload: {
                                                result: index
                                            }
                                        })
                                        return false
                                    }}
                                >
                                    {v.titleCase(proj.actions_available)}
                                </div>
                            : ''}
                        </div>
                    </div>
                </CardImg>
            )
        }
        const results = (this.props.results.get('data') || fromJS({}))
        const data = (results
                        .get('items') || fromJS([]))
                        .filter(d => d.get('index') !== 'team')
                        .toJS()
        const numItems = results.get('totalItems')
        const pageSize = results.get('pageSize');
        const numPages = numItems / numPages;
        const nextPage = numItems > results.get('end') + 1;
        const prevPage = results.get('start') - 1 > 0;
        const pageChange = ((page)=>{
            page--
            this.props.dispatch({type: 'GLOBAL_SEARCH_INFO_SET_PAGE', page})
            globalSearch({ query: this.props.global_search.get('search'), page })
            window.scrollTo(0,0)
        }).bind(this)

        return (
            <div>
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
                {this.props.results.get('fetching') ? <div className="loading"></div> : ''}
                {data.length == 0 ? <div>No Results</div> :
                    numItems > pageSize ?
                        <Pagination
                            activePage={this.props.results.get('page') + 1}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={numItems}
                            pageRangeDisplayed={5}
                            onChange={pageChange}
                        >
                        </Pagination>
                        : ''
                }
            </div>
        )
    }
}

export default Search
