import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AnimationHandler } from '../common'
import SearchBar from './search'
import {globalSearch} from '../../actions/search'

const mapStateToProps = (state) => {
    return {
        user: state.user,
        ui: state.ui
    }
}

@connect(mapStateToProps)
export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animHide: this.props.ui.get('global_search').get('show')
        }

        this.toggleSearchbar = this.toggleSearchbar.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    toggleSearchbar() {
        this.setState(Object.assign({}, this.state, { animHide: true }))
        this.props.dispatch({type: 'TOGGLE_GLOBAL_SEARCH'})
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
        if (this.props.history.location.pathname !== '/search' && text) {
            this.props.history.push('/search')
        } else {
            globalSearch({query: text})
        }
    }

    render() {
        let user = this.props.user
        let shouldRenderUserItems = user.size > 2 && user.get('fetched') && user.get('data') && user.get('data').get('user')
        let restOfMenu = ''
        if (shouldRenderUserItems) {
            user = user.get('data').get('user')

            restOfMenu = (
                <div>
                    <div className="search-bar-embeded-menu-wrapper">
                        <SearchBar noBlue={true} value={this.props.ui.get('global_search').get('search')} searchCallback={this.handleSearchChange} buttonCallback={this.toggleSearchbar} />
                    </div>
                    <ul className="menu">
                        <li>
                            <Link to={`/users/${user.get('id')}`}>
                                <i className="icon fa fa-user"></i>
                            </Link>
                            <ul className="dropdown">
                                <Link to={`/users/${user.get('id')}`}>
                                    <li>
                                        Profile
                                    </li>
                                </Link>
                                <Link to="/logout">
                                    <li>
                                        Logout
                                    </li>
                                </Link>
                            </ul>
                        </li>
                        <li>
                            <Link to="/notifications"><i className="fa shadow fa-bell"></i></Link>
                        </li>
                        <li className="phoneOnly">
                            <a className="pointer" onClick={this.toggleSearchbar}><i className="fa shadow fa-search"></i></a>
                        </li>
                    </ul>
                    {(this.props.ui.get('global_search').get('show')) ?
                        <AnimationHandler anim="SlideInTopAbs" animKey='always'>
                            <SearchBar value={this.props.ui.get('global_search').get('search')} searchCallback={this.handleSearchChange} buttonCallback={this.toggleSearchbar} />
                        </AnimationHandler>
                        : (this.state.animHide) ?
                            <div>
                            <AnimationHandler anim="SlideOutTopAbs" animKey='always'>
                                <SearchBar value={this.props.ui.get('global_search').get('search')} buttonCallback={this.toggleSearchbar} searchCallback={this.handleSearchChange} className='hide' />
                            </AnimationHandler>
                            </div>
                            : ''
                    }
                </div>
            )
        }

        return (
            <div className="header">
                <Link to="/"><img className="shadow" src="/assets/images/project_fuse.svg" /></Link>
                {restOfMenu}
            </div>
        )
    }
}
