import React, { Component } from 'react'
import { connect } from 'react-redux'
const ReactMarkdown = require('react-markdown')
import {Editor, EditorState} from '../../common'
import {Redirect } from 'react-router'
import {register} from '../../../actions/auth'
import {fromJS} from 'immutable'
import {RegisterForm} from './form'
import { SubmissionError } from 'redux-form'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const sendRegisterRequest = (dispatch) => (values)=>{
    event.preventDefault()
    let errors = [];
    if(!values.name)
        errors.push('Missing name')
    if(!values.email)
        errors.push('Missing email')
    if(!values.password)
        errors.push('Missing password')
    if(!values.confirm_password)
        errors.push('Missing password confirmation')
    if(values.password != values.confirm_password)
        errors.push('Passwords do not match!')
    if(errors.length == 0)
        return register(values.name, values.email, values.password)
    else{
        dispatch({
        type: 'LOAD_USER_REJECTED',
            payload:{
                response:{
                    data:{
                        errors
                    }
                }
            }
        })
    }
}

@connect(mapStateToProps)
export  class RegisterPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let errors = this.props.user.get('errors') || []
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
            <div className="register-box"> 
                <div className="centered">
                    <div>
                        <h2>Create a Project Fuse Account</h2>
                        <RegisterForm disabled={this.props.user.get("fetching")} onSubmit={sendRegisterRequest(this.props.dispatch)} />
                        <Link to="/login">Login</Link>
                       {errDisp}
                    </div>
                </div>
            </div>
        )
    }
}

RegisterPage.noSidebar = true;
RegisterPage.noBorder = true;
