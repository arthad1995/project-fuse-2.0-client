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
        const tab = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1)
        if(data){
            return <div>
                <Link to={`/organizations/${id}`}>
                    <div className={'section centered' + (tab == id ? ' selected' : '')}>
                        {data.get('name')}
                    </div>
                </Link>
                <div className="hidden section centered"></div>
                <div className="section sub-section">
                    <div>
                        <Link to={`/organizations/${id}/projects`}>
                            <div className={"section centered" + (tab === 'projects' ? ' selected' : '')}>
                                Projects
                            </div>
                        </Link>
                        <Link to={`/organizations/${id}/members`}>
                            <div className={"section centered" + (tab === 'members' ? ' selected' : '')}>
                                Members
                            </div>
                        </Link>
                        {data.get('canEdit') ?
                        <Link to={`/organizations/${id}/applicants`}>
                            <div className={"section centered" + (tab === 'applicants' ? ' selected' : '')}>
                                Applicants
                            </div>
                        </Link> : null}
                        {data.get('canEdit') ?
                        <Link to={`/organizations/${id}/settings`}>
                            <div className={"section centered" + (tab === 'settings' ? ' selected' : '')}>
                                Settings
                            </div>
                        </Link> : null}
                        {data.get('canEdit') ?
                        <Link to={`/organizations/${id}/statistics`}>
                            <div className={"section centered" + (tab === 'statistics' ? ' selected' : '')}>
                                Statistics
                            </div>
                        </Link> : null}
                    </div>
                </div>
                <div onClick={() => this.props.history.push('/')} className="section centered pointer clickable">Home</div>
            </div>
        }else{
            return <div></div>
        }
    }
}

Sidebar.goBottom = true;

export default Sidebar
