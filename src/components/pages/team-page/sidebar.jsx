import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) =>{
    return {
        teams: state.teams
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
        let data = this.props.teams.get('data')
        data = (data)? data.get(id) : null
        if(data){
            return <div>
                <Link to={`/teams/${id}`}>
                    <div className='section centered'>
                        Team Home
                    </div>
                </Link>
                <div className="hidden section centered"></div>
                <Link to={`/teams/${id}/members`}>
                    <div className="section centered">
                        Members
                    </div>
                </Link>
                {data.get('canEdit') ?
                <Link to={`/teams/${id}/stats`}>
                    <div className="section centered">
                        Statistics
                    </div>
                </Link> : null}
                {data.get('canEdit') ?
                <Link to={`/teams/${id}/settings`}>
                    <div className="section centered">
                        Settings
                    </div>
                </Link> : null }
                <div onClick={this.props.history.goBack} className="section centered pointer clickable">Back</div>
            </div>
        }else{
            return <div></div>
        }
    }
}

Sidebar.goBottom = true;

export default Sidebar
