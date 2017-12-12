import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor } from '../../elements/editor'
import { ErrorDisplay } from '../../../common'
import { goBack } from 'react-router-redux'
import { reduxForm, initialize } from 'redux-form'
import { Redirect } from 'react-router-dom'
import Form from './form'
import {EditorState} from 'draft-js'
import {fromJS} from 'immutable'

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
        console.log(this.props)
        
        if(!this.props.index) return <div className="loading"></div>
        const params = this.props.match.params
        const props = this.props[this.props.index] || fromJS({})
        const showName = !this.state.id

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

        if (props.get('REDIRECT_ID')) {
            return <Redirect to={`/${this.props.index}/${props.get('REDIRECT_ID')}`} />
        }

        const action = (this.state.edit) ? `Update ${this.props.name}` : `Create a new ${this.props.name} `

        const saveFunc = (this.state.edit) ? this.props.save(this.props.history)(this.state.id) : this.props.save

        if (this.state.edit && this.props.initialValues.loading || !this.Form) {
            return <div className='loading'></div>
        }

        return <div>
            <h2>{action}</h2>
            {this.props.initialValues.name? <h3>{this.props.initialValues.name}</h3>:null}
            <this.Form formName={`create=${this.props.name}`} customElems={this.props.customElems} showName={showName} initialValues={this.props.initialValues} disabled={props.get("fetching")} onSubmit={saveFunc} cancelAction={this.props.history.goBack} />
            <ErrorDisplay errors={props.get('errors')} />
        </div>
    }
}

export default Page
