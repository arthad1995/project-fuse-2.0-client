import React from 'react'
import {Async} from '../../common'
import { Field } from 'redux-form'


export const OrganizationPageSidebar = (props) => <Async load={import('./sidebar')} {...props}/>
export const OrganizationProjects = props => <Async load={import('./projects')} {...props} />
export const OrganizationStatistics = props => <Async load={import('./statistics')} {...props} />

const format = (tag) =>{
    return tag
}

export const OrganizationCustomElems = (organization) => {
    const profile = organization.get('profile') || Map()
    const tags = (organization.get('tags')) ? organization.get('tags').split(',') : []
    return <div className="skills">
        <h3>Tags</h3>
        <div className='fullWidth'>
            <ul>
                {tags.map((tag, index)=>{
                    return <li key={index}>{format(tag)}</li>
                })}
            </ul>
        </div>
    </div>
}

export const OrganizationCustomElemsEdit = () => {
    return <div>
        <label htmlFor="skills">Tags</label>
        <Field
            component="input"
            className="fullWidth"
            placeholder="A comma-separated list of tags for your Organization. e.g. School, Buisness, Hackathon"
            type="text"
            name="tags"
        /><br />
    </div>
}
