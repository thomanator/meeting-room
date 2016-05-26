var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var config = require('./config.js')

//app.set('views',config.dir+'/views')
//app.set('view engine','jade')

app.use(express.static(config.dir+'/public'))
app.use(bodyParser.json())

require('./routes.js')(app)

app.listen(config.port,function() {
	console.log('Meeting app is running on',config.port)
})