import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Card} from '../../common'

const mapStateToProps = (state) =>{
    return {
        feed: state.feed.get('data').get('feed')
    }
}

@connect( mapStateToProps )
class Home extends Component {
    constructor(props){ super(props)}

    render(){
        const feed = this.props.feed || []
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
