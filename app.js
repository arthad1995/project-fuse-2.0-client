const express = require('express')
const app = express()
const compression = require('compression')
const clusterStability = require('express-cluster-stability')

clusterStability(({log}) => {
    app.use(compression())
    app.use(express.static('dist'))
    
    app.listen(8081, () => log('Example app listening on port 8081!'))    
})
