import React from 'react'
import { connect } from 'react-redux'
import { mapSingleKey } from '../../mapping_helpers'

export const SearchPage = (paramObj, notFoundMsg = 'No Results') => {
    let key = paramObj.path
    paramObj.param = paramObj.param || {}
    
    class SearchPage extends React.Component {
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
            return this.Component ? <this.Component index={key} {...this.props} {...paramObj.param} notFoundMsg={notFoundMsg} /> : this.props.children || <div className='loading'></div>
        }
    }

    return SearchPage
}
