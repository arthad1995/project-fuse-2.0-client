import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) =>{
    return {
        projects: state.projects
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
        let data = this.props.projects.get('data')
        data = (data)? data.get(id) : null
        const tab = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1)
        if(data){
            return <div>
                {
                    data.get('organization') ? <Link to={`/organizations/${data.get('organization').get('id')}/projects`}>
                        <div className={'section centered'}>
                            <i className="fas fa-caret-square-up" /> {data.get('organization').get('name')}
                        </div>
                    </Link> : ''
                }
                <Link to={`/projects/${id}`}>
                    <div className={'section centered' + (tab == id ? ' selected' : '')}>
                        {data.get('name')}
                    </div>
                </Link>
                <div className="hidden section centered"></div>
                <div className="section sub-section">
                    <div>
                        <Link to={`/projects/${id}/members`}>
                            <div className={'section centered' + (tab === 'members' ? ' selected' : '')}>
                                Members
                            </div>
                        </Link>
                        {data.get('canEdit') ?
                        <Link to={`/projects/${id}/applicants`}>
                            <div className={'section centered' + (tab === 'applicants' ? ' selected' : '')}>
                                Applicants
                            </div>
                        </Link> : null}
                        {data.get('canEdit') ?
                        <Link to={`/projects/${id}/settings`}>
                            <div className={'section centered' + (tab === 'settings' ? ' selected' : '')}>
                            Settings
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
