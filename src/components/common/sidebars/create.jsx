import React, {Component} from 'react'
import {change_tab} from '../../../actions/ui'
import {Link} from 'react-router-dom'
import {TabSidebar} from './tabs' 
import { connect } from 'react-redux'
import ListItem from '../elements/listItem'
import { mapSingleKey } from '../mapping_helpers'

export const CreateSidebar = (display) => {
    console.log(display)
    class Sidebar extends Component {
        constructor(props){ super(props)}

        render(){
            return <div>
                <div className="section centered">
                    Create {display}
                </div>
            </div>
        }
    }
    Sidebar.goTop = true;
    return Sidebar
}
