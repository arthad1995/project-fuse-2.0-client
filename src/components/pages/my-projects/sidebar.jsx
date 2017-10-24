import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
class Sidebar extends Component {
    constructor(props){ super(props)}

    render(){
        return (
                <div>
                    <label htmlFor="tab1">
                        <div className='section centered'>
                            My Projects
                        </div>
                    </label>
                    <label htmlFor="tab2">
                        <div className='section centered'>
                            Applied Projects
                        </div>
                    </label>
                </div>
        )
    }
}

Sidebar.goTop = true;

export default Sidebar
