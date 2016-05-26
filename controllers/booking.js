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
			/*
			var startTime = new Date(req.body.startTime).toIsoString()
			var endTime = new Date(req.body.endTime)
			*/
				
			var startTime = moment.utc(req.body.startTime).toDate()
			var endTime = moment.utc(req.body.endTime).toDate()
					
	
			console.log('startTime',startTime)
			console.log('endTime',endTime)
			
			bookingModel.findOne({roomName:req.body.name,$or : [{$and:[{'date.startTime':{$lte : startTime}},{'date.endTime':{$gt:startTime}}]}
			,{$and : [{'date.startTime':{$lt: endTime}},{'date.endTime':{$gte : endTime}}]},{'date.startTime' : {$lte : startTime},'date.endTime' : {$gte : endTime}},
				{'date.startTime': {$gt : startTime},'date.endTime' : {$lt : endTime}}]},function(err,booking) {
					if(err) {
						common.errorMessage(err,res)
					}
					console.log('The booking',booking)
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