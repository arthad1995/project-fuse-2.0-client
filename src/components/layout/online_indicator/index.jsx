import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



const mapStateToProps = (state) => {
    return {
        online: state.ui.get('online'),
        was_offline: state.ui.get('was_offline')
    }
}

@connect(mapStateToProps)
export default class OnlineIndicator extends Component {
    constructor(props) { super(props) }

    render() {
        let online = this.props.online
        let className = (online) ? (this.props.was_offline) ? 'indicator online was_offline' : 'indicator online' : 'indicator offline'

        return <div className={className}></div>
    }
}
