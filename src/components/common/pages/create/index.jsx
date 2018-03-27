import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formValueSelector} from 'redux-form'

export const CreatePage = (paramObj) => {

    const params = paramObj.param || {}
    const name = params.name || ''
    const save = params.save || (() => { })
    const key = paramObj.path
    const selector = formValueSelector(`create=${name}`)

    const mapObject = key => state => {
        let map ={
            initialValues: state.edit_obj,
            formState: state.form,
            newLinkType: selector(state, 'newLinkType'),
            newLinkUrl: selector(state, 'newLinkUrl')
        }
        map[key] = state[key]
        return map
    }

    class Page extends Component {
        componentWillMount() {
            this.cancelUpdate = false
            import('./impl').then((c) => {
                this.Component =   connect(mapObject(key))(c.default)
                if (!this.cancelUpdate) {
                    this.forceUpdate()
                }
            })
        }

        componentWillUnmount() {
            this.cancelUpdate = true
        }

        render() {
            return this.Component ? <this.Component index={key} {...this.props} {...paramObj.param} /> : this.props.children || <div className='loading'></div>
        }
    }

    return Page
}
