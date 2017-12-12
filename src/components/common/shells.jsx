import React, { Component } from 'react'
import AnimationHandler from './elements/animation'



export const PageShell = Elem => {
    let className = 'content'
    if (Elem.noSidebar)
        className = 'full-content'
    if (Elem.noBorder)
        className += ' no-border'
    return props => <AnimationHandler anim="SlideInLeft" animKey="page" renderClassName={className}>
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

    return props => <AnimationHandler animKey="sidebar" anim="SlideInRight" renderClassName={className}>
    <Elem {...props} />
</AnimationHandler>
}
