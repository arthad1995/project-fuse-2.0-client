import React, { Component } from 'react'
import { connect } from 'react-redux'
const ReactMarkdown = require('react-markdown')
import {Editor, EditorState} from '../../common'
import {Redirect } from 'react-router'

require('./login.scss')

const login = (dispatch, router) =>  e => {
    console.log("Logging in")
    e.preventDefault()
    dispatch({
        type:'LOAD_USER_FULFILLED',
        payload: {
            data: {
                id: 12,
                first_name: 'John',
                last_name: 'Doe',
                friend_count: 25
            }
        }
    })
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
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
                        <form onSubmit={login(this.props.dispatch)}>
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
