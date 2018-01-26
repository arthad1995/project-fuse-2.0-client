import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class ListItem extends Component {
    constructor(props){ super(props)}

    render(){
        const baseUrl = '/' + this.props.baseUrl
        const skills = (this.props.elem && this.props.elem.get('skills')) ? this.props.elem.get('skills') : null
        return (
            <Link to={baseUrl + '/' + this.props.id}>
            <li className='listItem'>
                <div className="name">
                    {this.props.name || this.props.elem.get('name')}
                </div>
                <div className="buttons">
                    {this.props.children}
                    <div className="btn tone1-4-color">
                        View
                    </div>
                </div>
                {(skills && skills.size) ? 
                    <div className="skills">
                        <div>Skills: </div>
                        <ul>
                            {skills.map((skill, i) => {
                                return <li key={`${i}`}>{skill}</li>
                            })}
                        </ul>
                    </div>
                    : (skills) ? <div className="skills smallText"><i>No Skills Listed</i></div> : ''}
            </li>
            </Link>
        )
    }
}

export default ListItem
