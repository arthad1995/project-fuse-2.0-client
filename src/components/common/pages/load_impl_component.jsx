import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapSingleKeyWithUI, mapSingleKeyWithSearch } from '../mapping_helpers'

const LoadImplComponent = load => (paramObj, notFoundMsg, key, ui=false) => {
    key = key || paramObj.path
    const canEdit = paramObj.param.canEdit 
    const mapFunc = ui ? mapSingleKeyWithUI(key) : mapSingleKeyWithSearch(key)

    @connect(mapFunc)
    class Page extends Component {
        componentWillMount() {
            this.cancelUpdate = false
            load.then((c) => {
                this.Component =   connect(mapFunc)(c.default)
                if (!this.cancelUpdate) {
                    this.forceUpdate()
                }
            })
        }
    
        componentWillUnmount() {
            this.cancelUpdate = true
        }
    
        render() {
            return this.Component ? <this.Component index={paramObj.path} {...this.props} {...paramObj.param} canEdit={canEdit} notFoundMsg={notFoundMsg} /> : this.props.children || <div className='loading'></div>
        }
    }
    return Page
}

export default LoadImplComponent
