import React, {Component} from 'react'
import { connect } from 'react-redux'
import Sidebar from './sidebar'
import ListItem from './listItem.jsx'

const mapStateToProps = (state) =>{
    return {
        my_projects: state.user_projects.get('my_projects'),
        applied_projects: state.user_projects.get('applied_projects')
    }
}

@connect( mapStateToProps )
class MyProjects extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <div>
                <div className='tabs'>
                    <input id="tab1" type="radio" name="tabs" defaultChecked />
                    <input id="tab2" type="radio" name="tabs" />
                    <section id="tab1_content" className="tab-content">
                        <h3>My Projects</h3>
                        <ul className='list'>
                            {this.props.my_projects.map((project) => {
                                const id = project.get('id')
                                if(project)
                                    return <ListItem key={id} id={id} name={project.get('name')} />
                                return ''
                            })}
                        </ul>
                    </section>
                    <section id="tab2_content" className="tab-content">
                        <h3>Applied Projects</h3>
                        <ul className='list'>
                            {this.props.applied_projects.map((project) => {
                                const id = project.get('id')
                                if(project)
                                    return <ListItem key={id} id={id} name={project.get('name')} />
                                return ''
                            })}
                        </ul>
                    </section>
                </div>
            </div>
        )
    }
}

export default MyProjects
export const MyProjectsSidebar = Sidebar