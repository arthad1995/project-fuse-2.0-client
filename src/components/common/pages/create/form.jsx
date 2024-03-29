import React, { Component } from 'react'
import { ErrorDisplay } from '../../elements/error_display'
import { goBack } from 'react-router-redux'
import { Field, reset } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { addLink, loadEditLinkInfoFor, deleteLink } from '../../../../actions/link'
import ImageUpload from '../../elements/image_upload'
import VideoEmbed from '../../elements/video_embed'
import {titleName, getEmbedLink} from '../../../../utils/link'

class Form extends Component {

    constructor(props) {
        super(props)
        this.addLinkAction = this.addLinkAction.bind(this)
        this.deleteLink = this.deleteLink.bind(this)
        this.links = this.links.bind(this)
        this.state = {
            urlErrors: false,
            typeErrors: false
        }
    }

    render() {
        const {
            handleSubmit,
            cancelAction,
            formErrors,
            customElems,
            formName,
            newLinkType,
            newLinkUrl,
            newVideoUrl
        } = this.props
        let showName = this.props.showName

        if (showName !== false)
            showName = true

        let nameField = null

        const formState = this.props.formState || {}
        const vals = (formState[formName] || {}).values || {}
        const delLink = this.deleteLink

        if (showName)
            nameField = [
                <label key="name_label" htmlFor="name">Name</label>,
                <Field key="name_input" component="input" className="fullWidth" placeholder="Name" type="text" name="name" />,
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
                        <Field
                            maxLength="50"
                            component="input"
                            className="fullWidth with-char-count"
                            placeholder="A short phrase or sentance to describe who you are"
                            type="text"
                            name="headline"
                        />
                        <div className="character-count">
                            <div className="character-count__current">
                                {(vals.headline || '').length}
                            </div>
                            <div className="character-count__max">
                                50
                            </div>
                        </div>
                        <label htmlFor="summary">Summary</label><br />
                        <Field
                            maxLength="300"
                            component="textarea"
                            className="fullWidth with-char-count"
                            placeholder="A quick, on paragraph summary of what you do"
                            type="text"
                            name="summary"
                        />
                        <div className="character-count">
                            <div className="character-count__current">
                                {(vals.summary || '').length}
                            </div>
                            <div className="character-count__max">
                                300
                            </div>
                        </div>
                        {customElems ? customElems() : null}
                        {showName ? null :
                            <div>
                                <h3 className='title'>Videos</h3>
                                <div className="profile-form__video-add">
                                    <div className="profile-form__video-add__input">
                                        <div>
                                            <label htmlFor="newVideoUrl">
                                                Video URL:
                                            </label>
                                            <Field
                                                placeholder="New Video URL"
                                                component="input"
                                                type="text"
                                                name="newVideoUrl"
                                                id="newVideoUrl"
                                                className={this.state.urlErrors ? 'error': ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="profile-form__video-add__button">
                                        <div onClick={(() => {
                                            this.addVideoAction(newVideoUrl)
                                        }).bind(this)} className="btn right tone1-4-color">
                                            <i className="fas fa-plus" /> Add Video
                                        </div>
                                    </div>
                                    <div className="video-links">
                                        {
                                            this.links()
                                                .map((link, index) => ({link, index}))
                                                .filter(({link}) => (link.title || link.name) === 'video')
                                                .map(
                                                    ({link, index}) => {
                                                        return (
                                                            <div key={index} className="link-card">
                                                                <div className="link-card__title">
                                                                    Video
                                                                </div>
                                                                <div className="link-card__video">
                                                                    <VideoEmbed src={link.link} />
                                                                </div>
                                                                <div className="link-card__actions">
                                                                    {/* <div className="btn tone1-2-color">h
                                                                        Edit
                                                                    </div> */}
                                                                    <div
                                                                        className="btn tone2-2-color"
                                                                        onClick={() => delLink(index)}
                                                                    >
                                                                        Delete
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                )
                                        }
                                    </div>
                                    {this.props.orgId ?
                                        <Field component="input" type="hidden" name="orgId" />
                                        : ''
                                    }
                                    <Field component="input" type="hidden" name="profileLinks" />
                                </div>

                                <h3 className='title'>Links</h3>
                                <div className="profile-form__link-add">
                                    <div className="profile-form__link-add__input">
                                        <div className="profile-form__link-add__input__url">
                                            <div>
                                                <div>
                                                    <label htmlFor="newLinkUrl">
                                                        Link URL:
                                                    </label>
                                                </div>
                                                <div>
                                                    <Field
                                                        placeholder="New Link URL"
                                                        component="input"
                                                        type="text"
                                                        name="newLinkUrl"
                                                        id="newLinkUrl"
                                                        className={this.state.urlErrors ? 'error': ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-form__link-add__input__type">
                                            <div>
                                                <div>
                                                    <label htmlFor="newLinkType">
                                                        Link Type:
                                                    </label>
                                                </div>
                                                <div>
                                                <Field
                                                    name="newLinkType"
                                                    component="select"
                                                    className={this.state.typeErrors ? 'error': ''}
                                                >
                                                    <option>Please Select</option>
                                                    <option value="github">GitHub</option>
                                                    <option value="youtube_channel">YouTube Channel</option>
                                                    <option value="linkedin">LinkedIn</option>
                                                    <option value="facebook">Facebook</option>
                                                    <option value="twitter">Twitter</option>
                                                    <option value="wordpress">Wordpress</option>
                                                    <option value="drupal">Drupal</option>
                                                    <option value="website">Website</option>
                                                    <option value="resume">Resume</option>
                                                    <option value='published_article'>Published Article</option>
                                                </Field>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-form__link-add__button">
                                        <div onClick={(() => {
                                            this.addLinkAction(newLinkUrl, newLinkType)
                                        }).bind(this)} className="btn right tone1-4-color">
                                            <i className="fas fa-plus" /> Add Link
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-links">
                                    {
                                        this.links()
                                            .map((link, index) => ({link, index}))
                                            .filter(({link}) => (link.title || link.name) !== 'video')
                                            .map(
                                                ({link, index}) => {
                                                    return (
                                                        <div key={index} className="link-card">
                                                            <div className="link-card__title">
                                                                {titleName(link.title || link.name)}
                                                            </div>
                                                            <div className="link-card__url">
                                                                ({link.link})
                                                            </div>
                                                            <div className="link-card__actions">
                                                                {/* <div className="btn tone1-2-color">h
                                                                    Edit
                                                                </div> */}
                                                                <div
                                                                    className="btn tone2-2-color"
                                                                    onClick={() => delLink(index)}
                                                                >
                                                                    Delete
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                    }
                                </div>
                            </div>
                        }
                        {this.props.orgId ?
                            <Field component="input" type="hidden" name="orgId" />
                            : ''
                        }
                        <Field component="input" type="hidden" name="profileLinks" />
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

    deleteLink(index) {
        this.props.dispatch(deleteLink(index))
        let links = this.links().slice(0)
        links.splice(index, 1)
        this.props.dispatch({
            type: '@@redux-form/CHANGE',
            payload: JSON.stringify(links),
            meta: {
                field: "profileLinks",
                form: this.props.formName,
                persistentSubmitErrors: false,
                touch: false
            }
        })
    }

    links() {
        return (((this.props.initialValues || {}).profile || this.props.initialValues || {}).links || [])
    }

    addVideoAction(url) {
        return this.addLinkAction(url, 'video')
    }

    addLinkAction(url, type) {
        if (url && type) {
            this.setState({
                urlErrors: false,
                typeErrors: false
            })

            const maxId = this.links().reduce(
                (acc, cur) => (acc > (cur.id || 0)) ? acc : cur.id,
                0
            )

            const maxTmpId = this.links().reduce(
                (acc, cur) => (acc > (cur.tmpId || 0)) ? acc : cur.tmpId,
                0
            )

            const max = maxId > maxTmpId ? maxId : maxTmpId

            this.props.dispatch(addLink(url, type, max + 1))
            loadEditLinkInfoFor(url, type, max + 1)

            this.props.dispatch({
                type: '@@redux-form/CHANGE',
                payload: "",
                meta: {
                    field: "newLinkUrl",
                    form: this.props.formName,
                    persistentSubmitErrors: false,
                    touch: false
                }
            })
            this.props.dispatch({
                type: '@@redux-form/CHANGE',
                payload: "Please Select",
                meta: {
                    field: "newLinkType",
                    form: this.props.formName,
                    persistentSubmitErrors: false,
                    touch: false
                }
            })
            this.props.dispatch({
                type: '@@redux-form/CHANGE',
                payload: JSON.stringify(this.links().concat([{link:url,name:type}])),
                meta: {
                    field: "profileLinks",
                    form: this.props.formName,
                    persistentSubmitErrors: false,
                    touch: false
                }
            })
        } else {
            this.setState({
                urlErrors: !url,
                typeErrors: !type
            })
        }
    }
}

export default Form
