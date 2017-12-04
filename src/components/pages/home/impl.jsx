import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../../common'
import { List } from 'immutable'
import mockData from '../../../mock_data'

const mapStateToProps = (state) => {
    return {
        feed: (state.feed.get('data')) ? state.feed.get('data').get('feed') : null,
        ui: state.ui
    }
}

@connect(mapStateToProps)
class Home extends Component {
    constructor(props) { super(props) }

    componentWillMount() {
        mockData(this.props.dispatch, this.props.ui.get('mock_data'))
    }

    render() {
        const feed = this.props.feed || List()
        const mock_data = this.props.ui.get('mock_data')
        return (
            <div key={mock_data}>
                <div className="hidden">{mock_data}</div>
                {feed.map((feedItem) => {
                    if (feedItem)
                        return <Card key={feedItem.get('id')} accept={() => { 
                            this.props.dispatch({ type: 'SET_MOCK_DATA_DISPLAY', payload: 1 }),mockData(this.props.dispatch, 1) }
                        } decline={
                            () => { this.props.dispatch({ type: 'SET_MOCK_DATA_DISPLAY', payload: 2 }), mockData(this.props.dispatch, 2)}
                        } time={feedItem.get('time')} title={feedItem.get('title')} type={feedItem.get('type')} content={feedItem.get('content')} />
                    return ''
                })}
            </div>
        )
        return null
    }
}

export default Home
