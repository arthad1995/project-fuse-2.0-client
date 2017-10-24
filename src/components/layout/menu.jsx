import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}

@connect( mapStateToProps )
export default class Menu extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <div className="header">
                <Link to="/"><img src="/assets/images/project_fuse.svg" /></Link>
                <Link to={`/profile/${this.props.user.get('id')}`}><i className="icon fa fa-user"></i></Link>
                <Link to="/"><i className="fa fa-bell"></i></Link>
                <Link to="/"><i className="fa fa-envelope"></i></Link>
                <Link to="/"><i className="fa fa-inbox"></i></Link>
                <Link to="/"><i className="fa fa-search"></i></Link>
            </div>
        )
    }
}
