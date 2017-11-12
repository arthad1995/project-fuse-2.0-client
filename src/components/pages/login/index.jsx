import React, { Component } from 'react'
import { connect } from 'react-redux'
const ReactMarkdown = require('react-markdown')
import {Editor, EditorState} from '../../common'
import {Redirect } from 'react-router'
import {login} from '../../../actions/auth'

require('./login.scss')

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const sendLoginRequest = (event)=>{
    event.preventDefault()
    login(
        document.getElementById('email').value, 
        document.getElementById('password').value
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
                        <form onSubmit={sendLoginRequest}>
                            <div>
                                <input placeholder="Email" type="email" id="email" name="email" /><br />
                                <input placeholder="Password" type="password" id="password" name="password" /><br />
                            </div>
                            <input className='btn blue-color' type="submit" id="submit" name="submit" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.noSidebar = true;
LoginPage.noBorder = true;
