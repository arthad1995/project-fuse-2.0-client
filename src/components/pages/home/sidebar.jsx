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
                    <Link to='/my-friends'>
                        <div className='section centered'>
                            Friends
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
                    {
                        this.props.location.pathname !== '/' ?
                            <Link to='/'>
                                <div className="section centered pointer clickable">Home</div>
                            </Link> :
                            ''
                    }
                </div>
        )
    }
}

Sidebar.goTop = true;

export default Sidebar
