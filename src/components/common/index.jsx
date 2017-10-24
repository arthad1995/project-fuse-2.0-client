import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

require('./animations.scss')

export const PageShell = Elem => {
    return props => <ReactCSSTransitionGroup
    transitionAppear={true}
    transitionAppearTimeout={600}
    transitionEnterTimeout={600}
    transitionLeaveTimeout={200}
    transitionName="SlideInLeft"
  > 
        <Elem {...props} />
    </ReactCSSTransitionGroup>
}
export const SidebarShell =  Elem => {
    return props => <ReactCSSTransitionGroup
    transitionAppear={true}
    transitionAppearTimeout={600}
    transitionEnterTimeout={600}
    transitionLeaveTimeout={200}
    transitionName="SlideInRight"
  > 
        <Elem {...props} />
    </ReactCSSTransitionGroup>
}
