import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Async } from '../../../common'
import { show_time_picker, hide_time_picker } from '../../../../actions/ui'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Field, reset, reduxForm } from 'redux-form'

import {fromJS} from 'immutable'

const formName = 'access-settings'

const mapStateToProps = (state) => {
    return {
        data: state.edit_obj
    }
}

@connect(mapStateToProps)
class _AccessSettings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            success: false
        }

        this.redraw = this.redraw.bind(this)
    }

    redraw() {
        this.forceUpdate()
    }

    componentWillMount(){
        this.props.dispatch({
            type: '@@redux-form/CHANGE',
            payload: this.props.data.restriction,
            meta: {
                field: 'restriction',
                form: formName,
                persistentSubmitErrors: false,
                touch: false
            }
        })
    }

    render() {
        const {handleSubmit} = this.props
        const restriction = this.props.data.restriction
        const props = this.props
        let state = this.state
        const redraw = this.redraw
        return <div>
            <h2>Access Settings</h2>
            <div>
                <form onSubmit={(vals) => {
                    handleSubmit(vals).then(()=>{
                        state.success = true
                        setTimeout(() => {
                            state.success = false
                            redraw()
                        }, 3000)
                        props.dispatch(reset(formName))
                        props.dispatch({
                            type: '@@redux-form/CHANGE',
                            payload: this.props.data.restriction,
                            meta: {
                                field: 'restriction',
                                form: formName,
                                persistentSubmitErrors: false,
                                touch: false
                            }
                        })
                    })
                }}>
                    Join Restrictions:
                    <div>
                    <label><Field name="restriction"
                                component="input"
                                type="radio"
                                value="NONE"
                            />
                                None
                            </label>
                    <label><Field name="restriction"
                                component="input"
                                type="radio"
                                value="INVITE"
                            />
                                Apply
                            </label>
                    </div>
                    <div>
                        <button className="btn tone1-4-color" type="submit">Save</button>
                    </div>
                    {this.state.success ?
                        <div className="success-feedback">
                            Settings Saved!
                        </div>
                    : '' }
                </form>
            </div>
        </div>
    }
}

const AccessSettings = reduxForm({
    form: formName,
    destroyOnUnmount: false
})(_AccessSettings)

export default AccessSettings
