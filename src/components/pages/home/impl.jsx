import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../../common'
import { List } from 'immutable'
import { stopEvent } from '../../common'
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
        mockData(this.props.dispatch, this.props.ui.get('mock_data'), this.props.ui.get('mock_data_time'))
    }

    render() {
        const feed = this.props.feed || List()
        const mock_data = this.props.ui.get('mock_data')

        const time_selected = (time)=>()=>{this.props.dispatch({type: 'SET_MOCK_DATA_DISPLAY', payload: 1 }),this.props.dispatch({type: 'SET_MOCK_DATA_TIME', payload: time }),mockData(this.props.dispatch, 1, time)}

        return (
            <div key={mock_data}>
                <div id="popup" className="modalDialog" onClick={(e) => { document.getElementById('popup').classList.remove('show'); return false }}>
                    <div onClick={(e) => { stopEvent(e); return false; }}>
                        <div className="modal_close" onClick={(e) => { document.getElementById('popup').classList.remove('show'); return false }}></div>
                        <h2>Select an Interview Time Slot</h2>
                        <div>
                            <div className="btn tone1-4-color" onClick={time_selected('Dec 11, 8:00 am - Dec 11, 8:50 am')}>
                                Dec 11, 8:00 am - Dec 11, 8:50 am
                            </div>
                            <div className="btn tone1-4-color" onClick={time_selected('Dec 11, 9:00 am - Dec 11, 9:50 am')}>
                                Dec 11, 9:00 am - Dec 11, 9:50 am
                            </div>
                            <div  className="btn tone1-4-color"onClick={time_selected('Dec 12, 8:00 am - Dec 11, 8:50 am')}>
                                Dec 12, 8:00 am - Dec 11, 8:50 am
                            </div>
                            <div className="btn tone1-4-color" onClick={time_selected('Dec 12, 9:00 am - Dec 11, 9:50 am')}>
                                Dec 12, 9:00 am - Dec 11, 9:50 am
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden">{mock_data}</div>
                {feed.map((feedItem) => {
                    if (feedItem)
                        return <Card key={feedItem.get('id')} accept={() => {
                            document.getElementById(`popup`).classList.add('show')
                        }}
                            decline={
                                () => { this.props.dispatch({ type: 'SET_MOCK_DATA_DISPLAY', payload: 2 }), mockData(this.props.dispatch, 2) }
                            } time={feedItem.get('time')} title={feedItem.get('title')} type={feedItem.get('type')} content={feedItem.get('content')} schedule={feedItem.get('schedule')} />
                    return ''
                })}
            </div>
        )
        return null
    }
}

export default Home
