import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Editor, EditorState} from '../../common'

const mapStateToProps = (state) => {
    return {
        organizations: state.organizations
    }
}

@connect(mapStateToProps)
export  class OrganizationStatsPage extends Component {
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
        const data = this.props.organizations.get(params.id)
        return <div>
            <h2>Statistics for {data.get('name')}</h2>
        </div>
    }
}