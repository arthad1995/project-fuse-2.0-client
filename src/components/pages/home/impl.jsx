import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Card} from '../../common'
import {List} from 'immutable'
import mockData from '../../../mock_data'

const mapStateToProps = (state) =>{
    return {
        feed: (state.feed.get('data')) ? state.feed.get('data').get('feed') : null
    }
}

@connect( mapStateToProps )
class Home extends Component {
    constructor(props){ super(props)}

    componentWillMount(){
        mockData(this.props.dispatch)
    }

    render(){
        const feed = this.props.feed || List()
        return (
            <div>
                {feed.map((feedItem)=>{
                    if(feedItem)
                        return <Card key={feedItem.get('id')} time={feedItem.get('time')} title={feedItem.get('title')} type={feedItem.get('type')} content={feedItem.get('content')} />
                    return ''
                })}
            </div>
        )
    }
}

export default Home
