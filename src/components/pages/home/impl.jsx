import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../../common'
import { List } from 'immutable'
import { stopEvent } from '../../common'
import { loadFeeds } from '../../../actions/feeds'
import FeedItem from './feed_item'

const mapStateToProps = (state) => {
    return {
        feed: (state.feed.get('data')) ? state.feed.get('data') : null,
        ui: state.ui
    }
}

@connect(mapStateToProps)
class Home extends Component {
    constructor(props) { super(props) }

    componentWillMount() {
        loadFeeds()
    }

    render() {
        const feed = this.props.feed || List()

        return (
            <div>
                {feed.valueSeq().toArray().map(elem => <FeedItem data={elem} key={elem.get('id')} />)}
            </div>
        )
        return null
    }
}

export default Home
