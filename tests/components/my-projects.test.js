import React from 'react'
import store from './../../src/store'
import './test_helpers'
import {shallow,mount} from 'enzyme'
import {StaticRouter} from 'react-router'

import MyProjects, {MyProjectsSidebar} from './../../src/components/pages/my-projects'

var id = 1;

const projectsData = {
    my_projects: [
        {
            id: id++,
            name: "Jim's Juggling Robot",
            role: 'contributer'
        },
        {
            id: id++,
            name: "Project Fuse 2.0",
            role: 'admin'
        }
    ],
    applied_projects: [
        {
            id: id++,
            name: "Jim's Soccer Management App"
        }
    ]
}

store.dispatch({
    type:'LOAD_USERS_PROJECTS_FULFILLED',
    payload: {
        data: projectsData
    }
})

var context = {}

it('Current Projects list renders correctly', () => {
    const project_page = mount(
    <StaticRouter location="/my-projects" context={context}>
        <MyProjects store={store} />
    </StaticRouter>)
    
    expect(project_page.find('#tab1_content ul')).toHaveLength(1)
    const my_project_list = project_page.find('#tab1_content ul.list').at(0)
    expect(my_project_list.find('li')).toHaveLength(2)

    expect(project_page.find('#tab2_content ul')).toHaveLength(1)
    const applied_project_list = project_page.find('#tab2_content ul.list').at(0)
    expect(applied_project_list.find('li')).toHaveLength(1)
})