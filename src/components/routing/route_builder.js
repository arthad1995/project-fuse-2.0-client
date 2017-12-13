import React from 'react'
import {Route, Switch} from 'react-router'

export default ({rootPath, rootComponent, preFunc}) => {
    let routes = []

    return {
        add: ({ path, component }) => {
            routes.push({ path, component })
        },
        build: () => {
            return (
                <Switch key={rootPath}>
                    {routes.map(({ path, component }, index) => {
                        component = component || rootComponent
                        if(preFunc)
                            return <Route key={`${rootPath}-${index}`} path={`${rootPath}/${path}`} render={preFunc(component)} />
                        return <Route key={`${rootPath}-${index}`} path={`${rootPath}/${path}`} component={component} />
                    })}
                    <Route path={rootPath} component={rootComponent} />
                </Switch>
            )
        }
    }
}