import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) =>{
    return {
        organizations: state.organizations
    }
}

@connect( mapStateToProps )
class Sidebar extends Component {
    constructor(props){ super(props)}

    componentWillMount(){
        if(this.props.loadFunc)
            this.props.loadFunc(this.props.match.params.id)
    }

    render(){
        const id = this.props.match.params.id
        let data = this.props.organizations.get('data')
        data = (data)? data.get(id) : null
        if(data){
            return <div>
                <Link to={`/organizations/${id}`}>
                    <div className='section centered'>
                        Organization Home
                    </div>
                </Link>
                <div className="hidden section centered"></div>
                <Link to={`/organizations/${id}/projects`}>
                    <div className="section centered">
                        Projects
                    </div>
                </Link>
                <Link to={`/organizations/${id}/members`}>
                    <div className="section centered">
                        Members
                    </div>
                </Link>
                {data.get('canEdit') ?
                <Link to={`/organizations/${id}/stats`}>
                    <div className="section centered">
                        Statistics
                    </div>
                </Link> : null}
                {data.get('canEdit') ?
                <Link to={`/organizations/${id}/settings`}>
                    <div className="section centered">
                        Settings
                    </div>
                </Link> : null}
                <div onClick={this.props.history.goBack} className="section centered pointer clickable">Back</div>
            </div>
        }else{
            return <div></div>
        }
    }
}

Sidebar.goBottom = true;

export default Sidebar
