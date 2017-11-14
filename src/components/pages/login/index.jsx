import React, { Component } from 'react'
import { connect } from 'react-redux'
const ReactMarkdown = require('react-markdown')
import {Editor, EditorState} from '../../common'
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
        const errors = this.props.user.get('errors') || fromJS([])
        let errDisp = '';

        if(errors.size > 0){
            errDisp = (
                <div className='error'>
                    <ul>
                        {errors.map((err, index)=>{
                            return <li key={index}><div>{err}</div></li>
                        })}
                    </ul>
                </div>
            )
        }

        if(this.props.user.size > 2 && this.props.user.get("fetched"))
            return <Redirect to="/" />
        return (
            <div className="login-box"> 
                <div className="centered">
                    <div>
                        <h2>Project Fuse</h2>
                        <LoginForm onSubmit={sendLoginRequest} />
                        <Link to="/register">Create Account</Link>
                       {errDisp}
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.noSidebar = true;
LoginPage.noBorder = true;
