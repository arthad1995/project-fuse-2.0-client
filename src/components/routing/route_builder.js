import React from 'react'
import {Route, Switch} from 'react-router'

export default ({rootPath, rootComponent, preFunc}) => {
    let routes = []
    let _exact

    return {
        add: ({ path, component }) => {
            routes.push({ path, component })
        },
        exact: () => {
            _exact = true
        },
        build: () => {
            return (
                <Switch key={rootPath}>
                    {routes.map(({ path, component }, index) => {
                        component = component || rootComponent
                        if(preFunc)
                            return <Route exact={_exact} key={`${rootPath}-${index}`} path={`${rootPath}/${path}`} render={preFunc(component)} />
                        return <Route exact={_exact} key={`${rootPath}-${index}`} path={`${rootPath}/${path}`} component={component} />
                    })}
                    <Route exact={_exact} path={rootPath} component={rootComponent} />
                </Switch>
            )
        }
    }
}