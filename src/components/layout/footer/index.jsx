import React, {Component} from 'react'



export default class Footer extends Component {
    constructor(props){ super(props)}

    render(){
        return (
            <div className='footerWrapper'>
                <div className='footer'>
                    <div className='copyright'>
                        &copy; Team Fusion 2018
                    </div>
                    <div className='links'>
                        <a href="https://www.surveymonkey.com/r/RKVRXMK">Feedback</a>
                    </div>
                </div>
            </div>
        )
    }
}
