import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor } from '../../elements/editor'
import { ErrorDisplay } from '../../elements/error_display'
import { goBack } from 'react-router-redux'
import { reduxForm, initialize } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { fromJS } from 'immutable'
import Form from './form'
import {EditorState} from 'draft-js'

const mapObject = key => state => {
    let map = {
        initialValues: state.edit_obj
    }
    map[key] = state[key]
    return map
}

class Page extends Component {
    constructor(props) {
        super(props)

        const id = (this.props.match.params && this.props.match.params.id) ? this.props.match.params.id : null

        this.state = {
            editorState: EditorState.createEmpty(),
            edit: id,
            id
        };

        this.Form = reduxForm({
            // a unique name for the form
            form: `create=${this.props.name}`,
            destroyOnUnmount: false
        })(Form)
    }

    componentDidMount() {
        if (this.props.load && this.state.id)
            this.props.load(this.state.id).then(() => {
                this.props.dispatch(initialize(`create=${this.props.name}`, this.props.initialValues))
            })
    }

    onEditorStateChange(editorState) {
        this.state.editorState = editorState
    }

    render() {

        const params = this.props.match.params
        let props = this.props[this.props.index]

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

        if (this.props[this.props.index].get('REDIRECT_ID')) {
            return <Redirect to={`/${this.props.index}/${this.props[this.props.index].get('REDIRECT_ID')}`} />
        }

        const action = (this.state.edit) ? `Update ${this.props.name} ${this.props.initialValues.name}` : `Create a new ${this.props.name} `

        const saveFunc = (this.state.edit) ? this.props.save(this.props.history)(this.state.id) : this.props.save

        if (this.state.edit && this.props.initialValues.loading) {
            return <div className='loading'></div>
        }

        return <div>
            <h2>{action}</h2>
            <this.Form initialValues={this.props.initialValues} disabled={props.get("fetching")} onSubmit={saveFunc} cancelAction={this.props.history.goBack} />
            <ErrorDisplay errors={this.props[this.props.index].get('errors')} />
        </div>
    }
}

export default Page
