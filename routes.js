var user = require('./controllers/user.js')
var room = require('./controllers/room.js')
var booking = require('./controllers/booking.js')
var config = require('./config.js')


module.exports = function(app) {
	app.get('/dashboard',room.dashboard)
	app.get('/list',booking.list)
	app.get('/home',function(req,res) {
		res.sendFile(config.dir+'\\publicnew\\home.html')
	})

	app.post('/login',user.login)	
	app.post('/reserve',booking.reserve)
	app.post('/cancel',booking.cancel)
}