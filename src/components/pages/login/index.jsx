import React, { Component } from 'react'
import { connect } from 'react-redux'
const ReactMarkdown = require('react-markdown')
import {Editor, EditorState, ErrorDisplay} from '../../common'
import {Redirect } from 'react-router'
import {login} from '../../../actions/auth'
import {fromJS} from 'immutable'
import {LoginForm} from './form'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const sendLoginRequest = (values)=>{
    login(
        values.email, 
        values.password
    )
}

@connect(mapStateToProps)
export  class LoginPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.user.size > 2 && this.props.user.get("fetched"))
            return <Redirect to="/" />
        return (
            <div className="login-box"> 
                <div className="centered">
                    <div>
                        <h2>Project Fuse</h2>
                        <LoginForm disabled={this.props.user.get("fetching")} onSubmit={sendLoginRequest} />
                        <Link to="/register">Create Account</Link>
                        <ErrorDisplay errors={this.props.user.get('errors')} />
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.noSidebar = true;
LoginPage.noBorder = true;
