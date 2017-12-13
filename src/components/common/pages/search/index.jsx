import React from 'react'
import LoadImplComponent from '../load_impl_component'

export const SearchPage = (paramObj, notFoundMsg) => {
    if(paramObj.path == 'friends') paramObj.path = 'users'
    return LoadImplComponent(import('./impl'))(paramObj, notFoundMsg)
}