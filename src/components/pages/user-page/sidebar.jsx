import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadUser } from '../../../actions/profile_page'

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

@connect(mapStateToProps)
class Sidebar extends Component {
    constructor(props) { super(props) }

    componentWillMount() {
        loadUser(this.props.match.params.id)
    }

    render() {
        const params = this.props.match.params
        const data = this.props.users.get('data')
        const id = params.id
        const elem = (data) ? data.get(id) : null
        if (elem) {
            return <div>
                <Link to={`/users/${id}`}>
                    <div className='section centered'>
                        {elem.get('name')}
                    </div>
                </Link>
                <Link to={`/users/${id}/friends`}>
                    <div className='section centered'>
                        Friends
                    </div>
                </Link>
                <Link to={`/users/${id}/projects`}>
                    <div className="section centered">
                        Projects
                    </div>
                </Link>
                <Link to={`/users/${id}/organizations`}>
                    <div className="section centered">
                        Organizations
                    </div>
                </Link>
                <a>
                    <div onClick={this.props.history.goBack} className="section centered pointer clickable">Back</div>
                </a>
            </div>
        } else {
            return <div></div>
        }
    }
}

Sidebar.goBottom = true;

export default Sidebar
