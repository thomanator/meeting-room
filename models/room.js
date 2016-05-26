var mongo = require('mongodb').MongoClient
var config = require('../config.js')

exports.findOne = function(selectCriteria,cb) {
	mongo.connect(config.dbPath,function(err,db) {
		if(err) {
			return cb(err)
		}
		db.collection('bookings').findOne(selectCriteria,function(err,room) {
			if(err) {
				return cb(err)
			}
			return cb(null,room)
		})
	})
}

exports.find = function(selectCriteria,cb) {
	mongo.connect(config.dbPath,function(err,db) {
		if(err) {
			return cb(err)
		}
		db.collection('rooms').find(selectCriteria).toArray(function(err,rooms) {
			if(err) {
				return cb(err)
			}
			return cb(null,rooms)
		})
	})
}