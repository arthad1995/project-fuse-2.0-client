import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {stopEvent} from '../../../common'
import Cookies from 'js-cookie'
import config from '../../../../config'

class ListItem extends Component {
    constructor(props) { super(props) }

    dispElem(elem) {
        if (!elem) {
            return null
        }
        elem = elem.toJS();
        return (
            <div>
                {elem.headline ? <div className="headline">{elem.headline}</div>:''}
            </div>
        )
    }

    render() {
        const baseUrl = '/' + this.props.baseUrl
        const skills = (this.props.elem && this.props.elem.get('skills')) ? this.props.elem.get('skills') : null
        const owner = this.props.owner
        const handleSearchChange = this.props.handleSearchChange || null
        const children = this.props.children.filter(c => c)
        return (
            <Link to={baseUrl + '/' + this.props.id}>
                <li className='listItem'>
                    <div>
                        <div className="listItem__header">
                            <div className="listItem__header__img">
                                <img src={
                                    (this.props.elem.get('img') ?
                                        config.host + '/files/download/' + this.props.elem.get('img') :
                                        '/assets/images/profile_icon.svg'
                                    )
                                } />
                            </div>
                            <div className="listItem__header__name">
                                {this.props.name || this.props.elem.get('name')}
                            </div>
                        </div>
                        {(skills && skills.size) ?
                            <div className="skills--clickable">
                                <div>Skills: </div>
                                <ul>
                                    {handleSearchChange ? skills.map((skill, i) => {
                                        return <li key={`${i}`}
                                            onClick={(e) => {
                                                stopEvent(e)
                                                handleSearchChange(`${skill}`)
                                                return false;
                                            }}
                                        >{skill}</li>
                                    }) : skills.map((skill, i) => {
                                        return <li key={`${i}`}>{skill}</li>
                                    })}
                                </ul>
                            </div>
                            : <div className="skills smallText"><i>No Skills Listed</i></div>}
                    </div>
                    {(this.props.arr) ?
                        <div className="listItem__array">
                            {this.props.arrText}
                            {(this.props.arr || fromJS([])).toJS().map(
                                item => {
                                    return <div key={item} className="listItem__array__item">
                                        {item}
                                    </div>
                                }
                            )}
                        </div>
                        : ''}
                    {(owner) ?
                        <div><div className={`owner ${owner.get('id') == Cookies.get('ID') ? 'owned' : 'not_owned'}`}>
                            {owner.get('id') == Cookies.get('ID') ? '' : owner.get('name')}
                        </div></div>
                        : ''}
                    <div className="listItem__content">
                        {this.dispElem(this.props.elem)}
                    </div>
                    {children.length ?
                        <div className="listItem__actions"> {children} </div> : null}
                </li>
            </Link>
        )
    }
}

export default ListItem
