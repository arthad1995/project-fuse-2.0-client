import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {loadOrganizationProjects} from '../../../actions/profile_page'
import {ListItem, Tabs, Tab, TabList, TabPanel, stopEvent} from '../../common'
import {fromJS} from 'immutable'
import CreatePage from '../../common/pages/create/impl'
import {createProject} from '../../../actions/create'
import {applyToProject} from '../../../actions/apply'

@connect(state => {
    return {
        organization: state.org,
        projects: state.organization_projects.get('data'),
        tab: state.ui.get('sub_tab')
    }
})
class OrganizationProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabs: [
                "all",
                "create"
            ]
        }

        this.tabChange = this.tabChange.bind(this)
        this.showProjectList = this.showProjectList.bind(this)
        this.getOrgName = this.getOrgName.bind(this)
        this.showProjectForm = this.showProjectForm.bind(this)
        this.handleCreation = this.handleCreation.bind(this)
    }

    componentWillMount() {
        loadOrganizationProjects(this.props.match.params.id)
    }

    tabChange(index, lastIndex, event) {
        if (index === lastIndex) {
            return
        }

        this.props.dispatch({ type: "CHANGE_SUB_TAB", value: this.state.tabs[index] })
    }

    getOrgName() {
        return this.props.organization.name || ''
    }

    render() {
        console.log(this.props.organization)
        return (
            <div className="relative">
                <h2>Projects for {this.getOrgName()}</h2>
                <Tabs onSelect={this.tabChange} selectedIndex={this.state.tabs.indexOf(this.props.tab)}>
                    <TabList>
                        <Tab>Project List</Tab>
                        {this.props.organization.canCreateProject ? <Tab>Create Project</Tab> : '' }
                    </TabList>

                    <TabPanel>
                        {this.showProjectList()}
                    </TabPanel>

                    {this.props.organization.canCreateProject ?
                        <TabPanel>
                            {this.showProjectForm()}
                        </TabPanel>
                     : '' }
                </Tabs>
            </div>
        )
    }

    showProjectList() {
        const dispatch = this.props.dispatch
        return (
            <div>
                {this.props.projects && this.props.projects.size
                    ?
                        <ul className='list'>
                            {this.props.projects.valueSeq().toArray().map(proj => {
                                return (
                                    <ListItem
                                        defaultProfileImg="project_profile_icon.svg"
                                        key={proj.get('id')}
                                        elem={proj.get('profile')}
                                        owner={proj.get('owner')}
                                        baseUrl={"projects"}
                                        id={proj.get('id')}
                                        name={proj.get('name')}
                                    >
                                    {proj.get('canApply') || proj.get('canJoin') ?
                                        <div
                                            onClick={(e) => { stopEvent(e); applyToProject(proj, dispatch).then(() => loadOrganizationProjects(this.props.match.params.id));
                                                return false; }}
                                            className="btn tone1-1-color apply"
                                        >{proj.get('canApply') ? 'Apply' : 'Join'}</div>
                                        : ''
                                    }
                                    </ListItem>
                                )
                            })}
                        </ul>
                    : "No Projects are associated with " + this.getOrgName()}
            </div>
        )
    }

    handleCreation() {
        loadOrganizationProjects(this.props.match.params.id)
        this.props.dispatch({ type: "CHANGE_SUB_TAB", value: "all" })
    }

    showProjectForm() {
        const handleCreation = this.handleCreation
        return <CreatePage
            match={{}}
            index={'projects'}
            redirectFunc={true}
            save={(...args) => createProject(...args).then(handleCreation)}
            name={`Project for ${this.getOrgName()}`}
            initialValues={{orgId: this.props.match.params.id}}
            cancelAction={this.handleCreation}
            orgId={this.props.match.params.id}
        />
    }
}

export default OrganizationProjects
