import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        online: state.ui.get('online')
    }
}

@connect(mapStateToProps)
export default class OnlineIndicator extends Component {
    constructor(props) { super(props) }

    render() {
        let online = this.props.online

        if(online)
            return <div className="online-indicator"></div>
        else
            return <div className="offline-indicator"></div>
    }
}
