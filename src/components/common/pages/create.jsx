import React, { Component } from 'react'
import { connect } from 'react-redux'
const ReactMarkdown = require('react-markdown')
import { Editor, EditorState } from '../elements/editor'
import { ErrorDisplay } from '../elements/error_display'
import { goBack } from 'react-router-redux'
import { Field, reduxForm, initialize } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { fromJS } from 'immutable'

export const CreatePage = (paramObj) => {

    let params = paramObj.param || {}
    let name = params.name || ''
    let save = params.save || (() => { })
    let key = paramObj.path

    class Form extends Component  {

        render(){
            const { handleSubmit, cancelAction, formErrors } = this.props

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
    }
    Form = reduxForm({
        // a unique name for the form
        form: `create=${name}`,
        destroyOnUnmount: false
    })(Form)

    const mapObject = key => state => {
        let map ={
            initialValues: state.edit_obj
        }
        map[key] = state[key]
        return map
    }

    @connect(mapObject(key))
    class Page extends Component {
        constructor(props) {
            super(props)

            const id = (this.props.match.params && this.props.match.params.id) ? this.props.match.params.id : null

            this.state = {
                editorState: EditorState.createEmpty(),
                edit: id,
                id
            };
        }
        
        componentDidMount(){
            if(paramObj.param.load && this.state.id) 
                paramObj.param.load(this.state.id).then(() => {
                    this.props.dispatch(initialize(`create=${name}`, this.props.initialValues))
                })
        }

        onEditorStateChange(editorState) {
            this.state.editorState = editorState
        }

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

            const action = (this.state.edit) ? `Update ${name} ${this.props.initialValues.name}` : `Create a new ${name} `

            if(this.state.edit && this.props.initialValues.loading){
                return <div className='loading'></div>
            }

            return <div>
                <h2>{action}</h2>
                <Form initialValues={this.props.initialValues} disabled={props.get("fetching")} onSubmit={save} cancelAction={this.props.history.goBack} />
                <ErrorDisplay errors={this.props[key].get('errors')} />
            </div>
        }
    }

    return Page
}
