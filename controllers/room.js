

function room() {
	var moment = require('moment')
	var async = require('async')

	var roomModel = require('../models/room.js')
	var bookingModel = require('../models/booking.js')
	var common = require('../utils/common.js')
	
	this.dashboard = function(req,res) {
		console.log('Coming here!!')
		var resJson = {
			status : 'success',
			message : '',
			data : null
		}
		var timeNow = moment.utc().toDate()

		common.authenticateUser(req.headers.accesstoken,res,function(err,user) {
			if(err) {
				common.errorMessage(err,res)
			}
			var timeNow = moment().toDate()
			console.log('Time now',timeNow.getTime())
			console.log('Time now 2',moment.utc().toDate().getTime())
			roomModel.find({},function(err,rooms) {
				if(err) {
					common.errorMessage(err,res)
				}				
				async.each(rooms,function(room,callback) {
					bookingModel.find({roomName:room.name,'date.endTime' : {$gt : timeNow}},function(err,bookings) {
						if(err) {
							return callback(err)
						}

						room['occupied'] = false

						async.map(bookings, function(booking) {
							
							if(room.name = 'Creativity') {
								console.log(booking.date.startTime)
								console.log(booking.date.endTime)
							}

							var startTimeSeconds = new Date(booking.date.startTime).getTime()//-19800000
							var endTimeSeconds = new  Date(booking.date.endTime).getTime()//-19800000
							
							if(startTimeSeconds<=timeNow.getTime()&&endTimeSeconds>=timeNow.getTime()) {
								room['occupied'] = true
							}
						})
						room['bookings'] = bookings		
						return callback(null)				
					})	
				},function(err) {
					if(err) {
						common.errorMessage(err,res)
					}

					resJson['data'] = rooms
					return res.json(resJson)
				})	
			})
		})
	}
}

module.exports = new room()