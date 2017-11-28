const express = require('express')
const app = express()
var compression = require('compression')

app.use(compression())
app.use(express.static('dist'))

app.listen(8081, () => console.log('Example app listening on port 8081!'))
