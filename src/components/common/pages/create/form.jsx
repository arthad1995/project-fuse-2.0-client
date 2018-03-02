import React, { Component } from 'react'
import { ErrorDisplay } from '../../elements/error_display'
import { goBack } from 'react-router-redux'
import { Field, reset } from 'redux-form'
import { Redirect } from 'react-router-dom'
import ImageUpload from '../../elements/image_upload'

class Form extends Component {

    render() {
        const { handleSubmit, cancelAction, addLinkAction, formErrors, customElems } = this.props
        let showName = this.props.showName

        if (showName !== false)
            showName = true

        let nameField = null

        if (showName)
            nameField = [
                <label key="name_label" htmlFor="name">Name</label>,
                <Field key="name_input" component="input" className="fullWidth" required placeholder="Name" type="text" name="name" />,
                <br key="line_break" />
            ]

        return (
            <div>
                {!showName?
                <div>
                    <ImageUpload
                        curImg={this.props.background}
                        type="background"
                        width={688}
                        height={240}
                        defaultImg={"/assets/images/background-default.png"}
                        label='Change Background'
                    />
                    <ImageUpload
                        curImg={this.props.thumbnail}
                        className="centered"
                        type="thumbnail"
                        defaultImg={"/assets/images/profile_icon.svg"}
                        label='Change Profile'
                    />
                </div>
                : ''}
                <form className="withMargins" onSubmit={handleSubmit}>
                    <div>
                        {nameField}
                        <label htmlFor="headline">Headline</label>
                        <Field component="input" className="fullWidth" placeholder="A short phrase or sentance to describe who you are" type="text" name="headline" /><br />
                        <label htmlFor="summary">Summary</label><br />
                        <Field component="textarea" className="fullWidth" placeholder="A quick, on paragraph summary of what you do" type="text" name="summary" /><br />
                        {customElems ? customElems() : null}
                        <h3 className='title'>{'Links'}</h3>
                        <div onClick={addLinkAction} className="btn tone1-4-color"> {/*TODO use different button*/}
                            Add link
                        </div>
                        {/* <div className="cardWrapper">
                            {profile.get('links').map((link, index) => <div key={index} className="card lights">
                                <div class="content">
                                <Field component="input" className="fullWidth" placeholder="A short phrase or sentance to describe who you are" type="text" name="headline" /><br />
                                    <a href={link.get('link')}target="_blank">{link.get('name')}</a>
                                </div>
                            </div>)}
                        </div> */}
                    </div>
                    <div className="buttons">
                        <input className='btn save tone1-1-color' type="submit" id="submit" name="submit" value="Save" />
                        <div onClick={cancelAction} className="centered btn tone1-2-color">
                            Cancel
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form
