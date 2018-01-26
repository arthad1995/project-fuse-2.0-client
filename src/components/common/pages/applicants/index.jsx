import React from 'react'
import LoadImplComponent from '../load_impl_component'

export const ApplicantsPage = (paramObj, notFoundMsg) => {
    paramObj.path='applicants'
    return LoadImplComponent(import('./impl'))(paramObj, notFoundMsg, null, true)
}