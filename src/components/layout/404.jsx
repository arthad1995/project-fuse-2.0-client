import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NoMatch extends Component {
    constructor(props){ super(props)}

    render(){
        const feed = this.props.feed || []
        return (
            <div>
                <h1>404</h1>
                <h2>This page does not exist</h2>

                <p>Well, you weren't supposed to see this page.</p>
                <p>How about we get you on track?</p>
                <p>Click the link below to go back to your feed</p>
                <Link to='/'>Go Home</Link>
            </div>
        )
    }
}

NoMatch.noSidebar = true

export default NoMatch