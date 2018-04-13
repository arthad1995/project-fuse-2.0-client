import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../../common'
import { List } from 'immutable'
import { stopEvent } from '../../common'
import mockData from '../../../mock_data'
import {userOrganizations} from '../../../actions/user_related'
import ListItem from '../../common/elements/listItem'

const mapStateToProps = (state) => {
    return {
        organizations: state.related.get('orgs')
    }
}

@connect(mapStateToProps)
class Organizations extends Component {
    constructor(props) { super(props) }

    componentWillMount() {
        userOrganizations(this.props.match.params.id)
    }

    render() {
        const fetched = this.props.organizations.get('fetched')
        const data = this.props.organizations.get('data')

        let content = <div className="loading"></div>

        if (fetched) {
            if (data && data.size) {
                content = (
                    <ul className='list'>
                        {data.toList().map((elem) => {
                            const id = elem.get('id')
                            return <ListItem key={id}
                            defaultProfileImg="org_profile_icon.svg" baseUrl="organizations" id={id} elem={elem}>
                            </ListItem>
                        })}
                    </ul>
                )
            } else {
                content = (
                    <div>
                        <i>This user is not part of any organizations.</i>
                    </div>
                )
            }
        }
        return <div>
            <h2>Organizations</h2>
            {content}
        </div>
    }
}

export default Organizations
