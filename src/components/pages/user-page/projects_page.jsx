import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../../common'
import { List } from 'immutable'
import { stopEvent } from '../../common'
import mockData from '../../../mock_data'
import {userProjects} from '../../../actions/user_related'
import ListItem from '../../common/elements/listItem'

const mapStateToProps = (state) => {
    return {
        projects: state.related.get('projs')
    }
}

@connect(mapStateToProps)
class Projects extends Component {
    constructor(props) { super(props) }

    componentWillMount() {
        userProjects(this.props.match.params.id)
    }

    render() {
        const fetched = this.props.projects.get('fetched')
        const data = this.props.projects.get('data')

        let content = <div className="loading"></div>

        if (fetched) {
            if (data && data.size) {
                content = (
                    <ul className='list'>
                        {data.toList().map((elem) => {
                            const id = elem.get('id')
                            return <ListItem key={id}
                            defaultProfileImg="project_profile_icon.svg" baseUrl="projects" id={id} elem={elem}>
                            </ListItem>
                        })}
                    </ul>
                )
            } else {
                content = (
                    <div>
                        <i>This user is not part of any projects.</i>
                    </div>
                )
            }
        }
        return <div>
            <h2>Projects</h2>
            {content}
        </div>
    }
}

export default Projects
