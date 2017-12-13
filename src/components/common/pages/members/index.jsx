import React from 'react'
import LoadImplComponent from '../load_impl_component'

export const MembersPage = (paramObj, notFoundMsg) => {
    paramObj.path='members'
    return LoadImplComponent(import('./impl'))(paramObj, notFoundMsg)
}