import Sidebar from './sidebar'
import {Map} from 'immutable'
import React from 'react'
import { Field } from 'redux-form'
const v = require('voca')

require('./style.scss')

const format = (skill) =>{
    return skill
}

export const UserPageSidebar = Sidebar 
export const UserCustomElems = (user) => {
    const profile = user.get('profile') || Map()
    const skills = (profile.get('skills')) ? profile.get('skills').split(',') : []
    return <div className="skills">
        <h3>Skills</h3>
        <ul>
            {skills.map((skill)=>{
                return <li>{format(skill)}</li>
            })}
        </ul>
    </div>
}

export const UserCustomElemsEdit = () => {
    return <div>
        <label htmlFor="skills">Skills</label>
        <Field component="input" className="fullWidth" required placeholder="A comma-separated list of your skills. e.g. UI, C++,C#,Java,HTML,SQL" type="text" name="skills" /><br />
    </div>
}
