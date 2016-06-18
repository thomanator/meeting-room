function booking() {
	var mongo = require('mongodb')
	var moment = require('moment')

	var common = require('../utils/common.js')
	var bookingModel = require('../models/booking.js')	


	this.reserve = function(req,res) {
		
		resJson = {
			status:'success',
			message:'',
			data:null		
		}

		common.authenticateUser(req.headers.accesstoken,res,function(err,user) {
			if(err) {
				common.errorMessage(err,res)
			}
			if(req.body.day == 'Today') {
				var startTime = moment(moment().toDate().toISOString().split('T')[0]+'T'+req.body.startTime).toDate()
				var endTime = moment(moment().toDate().toISOString().split('T')[0]+'T'+req.body.endTime).toDate()
			}	
			else if(req.body.day == 'Tomorrow'){				
				var startTime = moment(moment().add(1,'day').toDate().toISOString().split('T')[0]+'T'+req.body.startTime).toDate()
				var endTime = moment(moment().add(1,'day').toDate().toISOString().split('T')[0]+'T'+req.body.endTime).toDate()		
			}					

			console.log('startTime',startTime)
			console.log('endTime',endTime)

			bookingModel.findOne({roomName:req.body.name,$or : [{$and:[{'date.startTime':{$lte : startTime}},{'date.endTime':{$gt:startTime}}]}
			,{$and : [{'date.startTime':{$lt: endTime}},{'date.endTime':{$gte : endTime}}]},{'date.startTime' : {$lte : startTime},'date.endTime' : {$gte : endTime}},
				{'date.startTime': {$gt : startTime},'date.endTime' : {$lt : endTime}}]},function(err,booking) {
					if(err) {
						common.errorMessage(err,res)
					}
					
					if(booking) {
						resJson['message'] = 'There is already a booking for this particular time!'
						res.json(resJson)
					}

					else {
						var insertObj = {
							user : user.email,
							name : user.firstName+' '+user.lastName,
							roomName : req.body.name,
							date: {
								startTime : startTime,
								endTime : endTime
							}
						}
						bookingModel.insert(insertObj,function(err) {
							if(err) {
								common.errorMessage(err,res)
							}
							resJson['message'] = 'Successfully booked the room'
							return res.json(resJson)
						})						
					}
			})
		})		
	}
	
	this.cancel = function(req,res) {
		resJson = {
			status:'success',
			message:'',
			data:null		
		}
		console.log('Coming to cancel mate',req.body)
		common.authenticateUser(req.headers.accesstoken,res,function(err,user) {
			if(err) {
				common.errorMessage(err,res)
			}			
			var bookingId = req.body.bookingId
			bookingModel.remove({_id: new mongo.ObjectId(bookingId)},function(err) {
				if(err) {
					common.errorMessage(err,res)
				}
				resJson['message'] = 'Successfully cancelled the booking'
				return res.json(resJson)
			})
		})
	}

	this.list = function(req,res) {
		resJson = {
			status:'success',
			message:'',
			data:null		
		}
		common.authenticateUser(req.headers.accesstoken,res,function(err,user) {
			if(err) {
				common.errorMessage(err,res)
			}
			var timeNow = moment.utc().toDate()

			bookingModel.find({username:user.username,'date.startTime':{$gt:timeNow}},function(err,list) {
				if(err) {
					common.errorMessage(err,res)
				}
				resJson['data'] = list
				return res.json(resJson)
			})
		})
	}
	
}

module.exports = new booking()