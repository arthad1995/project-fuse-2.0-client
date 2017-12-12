import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

@connect(mapStateToProps)
class Sidebar extends Component {
    constructor(props) { super(props) }

    render() {
        const params = this.props.match.params
        const data = this.props.users.get('data')
        const id = params.id
        const elem = (data) ? data.get(id) : null
        if (elem) {
            return <div>
                {/* <Link to={`/users/${id}/friends`}>*/}
                    <div className='section centered'>
                        Friends
                 </div>
                {/* </Link>*/}
                {/*<Link to={`/users/${id}/teams`}>*/}
                    <div className='section centered'>
                        Teams
                    </div>
                {/* </Link>*/}
                {/* <Link to={`/teams/${id}/projects`}>*/}
                    <div className="section centered">
                        Projects
                    </div>
                {/* </Link>*/}
                {/* <Link to={`/teams/${id}/organizations`}>*/}
                    <div className="section centered">
                        Organizations
                    </div>
                {/* </Link>*/}
                <div onClick={this.props.history.goBack} class="section centered pointer clickable">Back</div>
            </div>
        } else {
            return <div></div>
        }
    }
}

Sidebar.goBottom = true;

export default Sidebar
