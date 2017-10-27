import React, { Component } from 'react'
import { connect } from 'react-redux'
const ReactMarkdown = require('react-markdown')
import {Editor, EditorState} from './editor'

export const CreatePage = (name) => {
    class Page extends Component {
        constructor(props) {
            super(props)
            this.state = {
                editorState: EditorState.createEmpty(),
            };
        }

        onEditorStateChange (editorState) {
            this.state.editorState = editorState
        };

        render() {
            const params = this.props.match.params
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
            return <div>
                <h2>Create a new {name}</h2>
                <form>
                    <div>
                        <label>{name} Name</label>
                        <input type="text" name="name" />
                    </div>
                    <div>
                        <label>{name} Summary</label>
                        <input type="text" name="summary" />
                    </div>
                    <div>
                        <label>{name} Description</label>
                        <Editor
                            wrapperClassName="wysiwygWrapper"
                            editorClassName="wysiwygEditor"
                            toolbarClassName="wysiwygToolbar"
                            editorState={this.state.editorState}
                            onEditorStateChange={this.onEditorStateChange}
                            toolbar={toolbar}
                        />
                    </div>
                    <div className="buttons">
                        <div className="centered btn green-color">
                            Save
                        </div>
                        <div className="centered btn red-color">
                            Cancel
                        </div>
                    </div>
                </form>
            </div>
        }
    }
    return Page
}
