import React, { Component } from 'react'
import { connect } from 'react-redux'
const ReactMarkdown = require('react-markdown')
import { mapSingleKey } from '../mapping_helpers'
import { Editor, EditorState } from '../elements/editor'
import { ErrorDisplay } from '../elements/error_display'
import { goBack } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { fromJS } from 'immutable'

export const CreatePage = (paramObj) => {

    let params = paramObj.param || {}
    let name = params.name || ''
    let save = params.save || (() => { })
    let key = paramObj.path

    let Form = props => {
        const { handleSubmit, cancelAction, formErrors } = props

        return (
            <form onSubmit={handleSubmit}>
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
    Form = reduxForm({
        // a unique name for the form
        form: `create=${name}`,
        destroyOnUnmount: false
    })(Form)

    @connect(mapSingleKey(key))
    class Page extends Component {
        constructor(props) {
            super(props)
            this.state = {
                editorState: EditorState.createEmpty(),
            };
        }

        onEditorStateChange(editorState) {
            this.state.editorState = editorState
        };

        render() {

            const params = this.props.match.params
            let props = this.props[key]
            const toolbar = {
                options: ['inline', 'blockType', 'fontSize', 'list', 'link', 'embedded', 'emoji', 'image', 'history'],
                embedded: {
                    defaultSize: {
                        height: '315',
                        width: '560',
                    },
                },
                inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough']
                },
            }

            if (this.props[key].get('REDIRECT_ID')) {
                return <Redirect to={`/${key}/${this.props[key].get('REDIRECT_ID')}`} />
            }
            return <div>
                <h2>Create a new {name}</h2>
                <Form disabled={props.get("fetching")} onSubmit={save} cancelAction={this.props.history.goBack} />
                <ErrorDisplay errors={this.props[key].get('errors')} />
            </div>
        }
    }

    return Page
}
