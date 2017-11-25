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

    render(){
        const id = this.props.match.params.id
        let data = this.props.projects.get('data')
        data = (data)? data.get(id) : null
        if(data){
            return <div>
                <Link to={`/projects/${id}`}>
                    <div className='section centered'>
                            Project Home
                    </div>
                </Link>
                <Link to={`/projects/${id}/members`}>
                    <div className="section centered">
                        Members
                    </div>
                </Link>
                <Link to={`/projects/${id}/teams`}>
                    <div className="section centered">
                        Teams
                    </div>
                </Link>
                <Link to={`/projects/${id}/links`}>
                    <div className="section centered">
                        Links
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
