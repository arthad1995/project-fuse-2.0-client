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
        const tab = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1)
        if (elem) {
            return <div>
                <Link to={`/users/${id}`}>
                    <div className={'section centered' + (tab == id ? ' selected' : '')}>
                        {elem.get('name')}
                    </div>
                </Link>
                <div className="hidden section centered"></div>
                <div className="section sub-section">
                    <div>
                        <Link to={`/users/${id}/friends`}>
                            <div className={'section centered' + (tab === 'friends' ? ' selected' : '')}>
                                Friends
                            </div>
                        </Link>
                        <Link to={`/users/${id}/projects`}>
                            <div className={'section centered' + (tab === 'projects' ? ' selected' : '')}>
                                Projects
                            </div>
                        </Link>
                        <Link to={`/users/${id}/organizations`}>
                            <div className={'section centered' + (tab === 'organizations' ? ' selected' : '')}>
                                Organizations
                            </div>
                        </Link>
                    </div>
                </div>
                <div onClick={() => this.props.history.push('/')} className="section centered pointer clickable">Home</div>
            </div>
        } else {
            return <div></div>
        }
    }
}

Sidebar.goBottom = true;

export default Sidebar
