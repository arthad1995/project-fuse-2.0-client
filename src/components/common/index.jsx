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
export const SidebarShell =  (Elem, pos) => {
    if(pos == 'none')
        return props => <span></span>
    let className = "leftSidebar"
    if(Elem.goBottom || Elem.goTop)
        className = "leftSidebar-show"
    
    let show = false;
    if(pos === 'top' && !Elem.goBottom){
        show = true;
    }
    else if(pos === 'bottom' && Elem.goBottom){
        show = true;
    }
    if(!show)
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
