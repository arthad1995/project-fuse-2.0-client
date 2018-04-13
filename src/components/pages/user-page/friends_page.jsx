import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../../common'
import { List, fromJS } from 'immutable'
import { stopEvent } from '../../common'
import mockData from '../../../mock_data'
import {userFriends} from '../../../actions/user_related'
import ListItem from '../../common/elements/listItem'

const mapStateToProps = (state) => {
    return {
        friends: state.related.get('friends')
    }
}

@connect(mapStateToProps)
class Friends extends Component {
    constructor(props) { super(props) }

    componentWillMount() {
        userFriends(this.props.match.params.id)
    }

    render() {
        const fetched = this.props.friends.get('fetched')
        const data = this.props.friends.get('data')

        let content = <div className="loading"></div>
        const userId = this.props.match.params.id

        if (fetched) {
            if (data && data.size) {
                content = (
                    <ul className='list'>
                        {data.toList().map((elem) => {
                            const friend = elem.get('receiver').get('id') == userId ? elem.get('sender') : elem.get('receiver')
                            return <ListItem
                                key={elem.get('id')}
                                baseUrl="users"
                                id={friend.get('id')}
                                name={friend.get('name')}
                                elem={friend.get('profile') || fromJS({})}
                            >
                            </ListItem>
                        })}
                    </ul>
                )
            } else {
                content = (
                    <div>
                        <i>This user does not have any friends.</i>
                    </div>
                )
            }
        }
        return <div>
            <h2>Friends</h2>
            {content}
        </div>
    }
}

export default Friends
