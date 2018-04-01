import Sidebar from './sidebar'
import React from 'react'
import { Field } from 'redux-form'


export const ProjectPageSidebar = Sidebar 

const format = (tag) =>{
    return tag
}

export const ProjectCustomElems = (project) => {
    const profile = project.get('profile') || Map()
    const tags = (profile.get('tags')) ? profile.get('tags').split(',') : []
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

export const ProjectCustomElemsEdit = () => {
    return <div>
        <label htmlFor="skills">Tags</label>
        <Field
            component="input"
            className="fullWidth"
            placeholder="A comma-separated list tags for your project. e.g. Web, Mobile, ML"
            type="text"
            name="tags"
        /><br />
    </div>
}
