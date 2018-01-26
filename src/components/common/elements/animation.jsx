import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        animation: state.ui.get('animation') || Map()
    }
}

@connect(mapStateToProps)
export default class AnimationHandler extends Component {
    componentWillMount() {
        this.cancelUpdate = false
        import('react-transition-group/CSSTransitionGroup').then((c) => {
            this.Anim = c
            if (!this.cancelUpdate) {
                this.forceUpdate()
            }
        })
    }

    componentWillUnmount() {
        this.cancelUpdate = true
    }

    render() {
        let animProp = this.props.animKey || "always"
        let shouldRunAnim = (animProp && this.props.animation.get(animProp)) ? this.props.animation.get(animProp) : animProp === 'always'

        let res = <div className={this.props.renderClassName}>
            {this.props.children}
        </div>

        if (shouldRunAnim && this.Anim) {
            if (!this.props.hide_appear)
                return<div className='zindex-fix'><this.Anim
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName={this.props.anim || "SlideInLeft"}
                >
                    {res}
                </this.Anim></div>
            else
                return <this.Anim
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName={this.props.anim || "SlideInLeft"}
                >
                    {res}
                </this.Anim>
        }
        return res
    }
}