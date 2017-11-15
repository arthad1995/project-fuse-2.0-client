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

    render(){
        const id = this.props.match.params.id
        let data = this.props.organizations.get('data')
        data = (data)? data.get(id) : null
        if(data){
            return <div>
                <Link to={`/organizations/${id}`}>
                    <div className='section centered'>
                        <img src={data.get('image')} className='profileImage hideOnPhone' />
                        <div className='phoneOnly'>
                            Organization Page
                        </div>
                    </div>
                </Link>
                <Link to={`/organizations/${id}/projects`}>
                    <div className="section centered">
                        Projects
                    </div>
                </Link>
                <Link to={`/organizations/${id}/teams`}>
                    <div className="section centered">
                        Teams
                    </div>
                </Link>
                <Link to={`/organizations/${id}/members`}>
                    <div className="section centered">
                        Members
                    </div>
                </Link>
                <Link to={`/organizations/${id}/links`}>
                    <div className="section centered">
                        Links
                    </div>
                </Link>
                <Link to={`/organizations/${id}/stats`}>
                    <div className="section centered">
                        Statistics
                    </div>
                </Link>
            </div>
        }else{
            return <div></div>
        }
    }
}

Sidebar.goBottom = true;

export default Sidebar
