import React, {Component} from 'react'
import { connect } from 'react-redux'
import Sidebar from './sidebar'
import ListItem from './listItem.jsx'

const mapStateToProps = (state) =>{
    return {
        my_projects: state.user_projects.get('my_projects'),
        applied_projects: state.user_projects.get('applied_projects'),
        selected_tab: state.ui.get('selected_tab')
    }
}

@connect( mapStateToProps )
class MyProjects extends Component {
    constructor(props){ super(props)}

    render(){
        let dispatch = this.props.dispatch
        const base_class = 'tab-content '
        const selected_tab = this.props.selected_tab || 'tab1'
        return (
            <div>
                <div className='tabs'>
                    <section id="tab1_content" className={base_class + (('tab1' === selected_tab)? 'visible': 'hidden')}>
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
                    <section id="tab2_content" className={base_class + (('tab2' === selected_tab)? 'visible': 'hidden')}>
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