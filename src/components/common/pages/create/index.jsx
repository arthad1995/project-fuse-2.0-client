import React, { Component } from 'react'
import { connect } from 'react-redux'

export const CreatePage = (paramObj) => {

    const params = paramObj.param || {}
    const name = params.name || ''
    const save = params.save || (() => { })
    const key = paramObj.path
    console.log(`Key: ${key}`)

    const mapObject = key => state => {
        let map ={
            initialValues: state.edit_obj
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
            console.log(key)
            console.log(paramObj.param)
            return this.Component ? <this.Component index={key} {...this.props} {...paramObj.param} /> : this.props.children || <div className='loading'></div>
        }
    }

    return Page
}
