import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {fromJS} from 'immutable'



const mapStateToProps = (state) =>{
    return {
        user: state.user,
        friends: state.friends
    }
}

@connect( mapStateToProps )
class Sidebar extends Component {
    constructor(props){ super(props)}

    render(){
        const data = this.props.user.get('data') || fromJS({})
        const user = data.get('user') || fromJS({})
        const name = user.get('name') || ''
        const num_friends = user.get('friend_count') || 0
        return (
                <div>
                    <div className='section centered hideOnPhone'>
                        <h2>{`${name}`}</h2>
                    </div>
                    <div className='section centered hideOnPhone'>
                        <div className='num_friends'>
                            <div>
                                {num_friends}
                            </div>
                            <div>Friends</div>
                            <div><Link to='/my-friends'>Find more Friends</Link></div>
                        </div>
                    </div>
                    <Link to='/my-teams'>
                        <div className='section centered'>
                            Teams
                        </div>
                    </Link>
                    <Link to='/my-projects'>
                        <div className='section centered'>
                            Projects
                        </div>
                    </Link>
                    <Link to='/my-organizations'>
                        <div className='section centered'>
                            Organizations
                        </div>
                    </Link>
                </div>
        )
    }
}

Sidebar.goTop = true;

export default Sidebar
