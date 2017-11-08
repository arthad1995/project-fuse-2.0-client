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
        let user = this.props.user
        let shouldRenderUserItems = user.size > 2 && user.get('fetched')

        let restOfMenu = ''

        if(shouldRenderUserItems){
            restOfMenu = (
                <span>
                    <a />
                    <Link to={`/profile/${user.get('id')}`}><i className="icon fa fa-user"></i></Link>
                    <Link to="/"><i className="fa fa-bell"></i></Link>
                    <Link to="/"><i className="fa fa-envelope"></i></Link>
                    <Link to="/"><i className="fa fa-search"></i></Link>
                </span>
            )
        }

        return (
            <div className="header">
                <Link to="/"><img src="/assets/images/project_fuse.svg" /></Link>
                {restOfMenu}
            </div>
        )
    }
}
