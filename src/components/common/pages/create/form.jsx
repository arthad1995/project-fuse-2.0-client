import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ErrorDisplay } from '../../elements/error_display'
import { goBack } from 'react-router-redux'
import { Field } from 'redux-form'
import { Redirect } from 'react-router-dom'

class Form extends Component {

    render() {
        const { handleSubmit, cancelAction, formErrors, customElems } = this.props
        let showName = this.props.showName

        if (showName !== false)
            showName = true

        let nameField = null

        if (showName)
            nameField = [
                <label htmlFor="name">Name</label>,
                <Field component="input" className="fullWidth" required placeholder="Name" type="text" name="name" />,
                <br />
            ]

        return (
            <form className="withMargins" onSubmit={handleSubmit}>
                <div>
                    {nameField}
                    <label htmlFor="headline">Headline</label>
                    <Field component="input" className="fullWidth" placeholder="A short phrase or sentance to describe who you are" type="text" name="headline" /><br />
                    <label htmlFor="summary">Summary</label><br />
                    <Field component="textarea" className="fullWidth" placeholder="A quick, on paragraph summary of what you do" type="text" name="summary" /><br />
                    {customElems ? customElems() : null}
                </div>
                <div className="buttons">
                    <input className='btn tone1-1-color' type="submit" id="submit" name="submit" value="Save" />
                    <div onClick={cancelAction} className="centered btn tone1-2-color">
                        Cancel
                    </div>
                </div>
            </form>
        )
    }
}

export default Form
