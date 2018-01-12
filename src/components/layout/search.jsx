import React, { Component } from 'react'
import SearchInput from 'react-search-input'

export default class SearchBar extends Component {
    constructor(props) { super(props) }

    render() {
        return <div className={"search-bar-menu tone1-2-color " + (this.props.className || '')}>
            <SearchInput value={this.props.value} className="search-input" onChange={this.props.searchCallback} />
            <div onClick={this.props.buttonCallback} className="btn tone1-4-color">
                <i className="fas fa-angle-up"></i>
            </div>
        </div>
    }
}
