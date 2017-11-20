import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import {Map} from 'immutable'

require('./animations.scss')


const mapStateToProps = (state) => {
    return {
        animation: state.ui.get('animation') || Map()
    }
}

@connect(mapStateToProps)
class AnimationHandler extends Component {
    render() {
        let animProp = this.props.animKey || false
        let shouldRunAnim = (animProp && this.props.animation.get(animProp)) ? this.props.animation.get(animProp) : false
        let res =  <div className={this.props.renderClassName}>
            {this.props.children}
        </div>
        
        if(shouldRunAnim)
            return <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
                transitionName="SlideInLeft"
            >
                {res}
            </ReactCSSTransitionGroup>
        return res
    }
}

export const PageShell = Elem => {
    let className = 'content'
    if (Elem.noSidebar)
        className = 'full-content'
    if (Elem.noBorder)
        className += ' no-border'
    return props => <AnimationHandler renderClassName={className}>
        <Elem {...props} />
    </AnimationHandler>
}
export const SidebarShell = (pos) => (Elem) => {
    if (pos == 'none')
        return props => <span></span>
    let className = "leftSidebar"
    if (Elem.goBottom && pos === 'bottom')
        className = "leftSidebar-phone"
    if (pos === 'top' && !Elem.goBottom)
        className = 'leftSidebar-show';

    let show = false;
    if (pos === 'top') {
        show = true;
    }
    else if (pos === 'bottom' && Elem.goBottom) {
        show = true;
    }
    if (!show)
        return props => <span></span>

    return props => <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="SlideInRight"
    >
        <div className={className}>
            <Elem {...props} />
        </div>
    </ReactCSSTransitionGroup>
}
