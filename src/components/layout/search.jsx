import React, { Component } from 'react'
import SearchInput from 'react-search-input'

export default class SearchBar extends Component {
    constructor(props) { super(props) }

    render() {
        return <div className={(this.props.noBlue? 'search-bar-embeded-menu' :"search-bar-menu tone1-5-color ") + (this.props.className || '')}>
            <div className="search-bar-menu__content">
                <i className="search-icon fas fa-search" />
                <SearchInput value={this.props.value} className="search-input" onChange={this.props.searchCallback}>
                </SearchInput>
                {!this.props.noBlue? <div onClick={this.props.buttonCallback} className="btn tone1-4-color">
                    <i className="fas fa-angle-up"></i>
                </div> : ''}
            </div>
        </div>
    }
}
