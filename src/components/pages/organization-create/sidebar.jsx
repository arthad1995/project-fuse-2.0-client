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
        const data = this.props.organizations.get(id)
       
        return <div>
            <div className="section centered">
                Create Organization
            </div>
            <div className="section centered">
                Go Back
            </div>
        </div>
    }
}

Sidebar.goBottom = true;

export default Sidebar
