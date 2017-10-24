import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}

@connect( mapStateToProps )
class Sidebar extends Component {
    constructor(props){ super(props)}

    render(){
        const user = this.props.user
        const first_name = user.get('first_name') || ''
        const last_name = user.get('last_name') || ''
        const num_friends = user.get('friend_count') || 0
        return (
                <div>
                    <div className='section centered hideOnPhone'>
                        <h2>{`${first_name} ${last_name}`}</h2>
                    </div>
                    <div className='section centered hideOnPhone'>
                        <div className='num_friends'>
                            <div>
                                {num_friends}
                            </div>
                            <div>Friends</div>
                            <div>Find more Friends</div>
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
