import React, {Component} from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}

@connect( mapStateToProps )
export default class Sidebar extends Component {
    constructor(props){ super(props)}

    render(){
        const user = this.props.user
        const first_name = user.get('first_name') || ''
        const last_name = user.get('last_name') || ''
        const num_friends = user.get('friend_count') || 0
        return (
                <div>
                    <div className='section centered'>
                        <h2>{`${first_name} ${last_name}`}</h2>
                    </div>
                    <div className='section centered'>
                        <div className='num_friends'>
                            <div>
                                {num_friends}
                            </div>
                            <div>Friends</div>
                            <div>Find more Friends</div>
                        </div>
                    </div>
                </div>
        )
    }
}
