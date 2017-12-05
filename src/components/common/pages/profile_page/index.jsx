import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'

export const ProfilePage = (paramObj    ) => {
    let key = paramObj.path
    const canEdit = paramObj.param.canEdit 

    @connect(mapSingleKey(key))
    class Page extends Component {
        componentWillMount() {
            this.cancelUpdate = false
            import('./impl').then((c) => {
                this.Component =   connect(mapSingleKey(key))(c.default)
                if (!this.cancelUpdate) {
                    this.forceUpdate()
                }
            })
        }
    
        componentWillUnmount() {
            this.cancelUpdate = true
        }
    
        render() {
            return this.Component ? <this.Component index={key} {...this.props} {...paramObj.param} canEdit={canEdit} /> : this.props.children || <div className='loading'></div>
        }
    }
    return Page
}