const express = require('express')
const app = express()
const compression = require('compression')
const clusterStability = require('express-cluster-stability')
const favicon = require('serve-favicon')
const path = require('path')

clusterStability(({log}) => {
    app.use(compression())

    app.use(favicon(path.join(__dirname,'dist','assets','images','favicon.ico')))
    app.use(express.static('dist'))

    app.listen(8081, () => log('Example app listening on port 8081!'))
})
