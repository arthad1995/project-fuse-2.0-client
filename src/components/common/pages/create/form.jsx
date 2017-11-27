import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ErrorDisplay } from '../../elements/error_display'
import { goBack } from 'react-router-redux'
import { Field, reduxForm, initialize } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { fromJS } from 'immutable'

class Form extends Component {

    render() {
        const { handleSubmit, cancelAction, formErrors } = this.props

        return (
            <form className="withMargins" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Field component="input" required placeholder="Name" type="text" name="name" />
                </div>
                <div className="buttons">
                    <input className='btn green-color' type="submit" id="submit" name="submit" value="Save" />
                    <div onClick={cancelAction} className="centered btn red-color">
                        Cancel
                                </div>
                </div>
            </form>
        )
    }
}

export default Form
