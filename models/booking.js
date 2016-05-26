var mongo = require('mongodb').MongoClient
var config = require('../config.js')

exports.findOne = function(selectCriteria,cb) {
	mongo.connect(config.dbPath,function(err,db) {
		if(err) {
			return cb(err)
		}
		db.collection('bookings').findOne(selectCriteria,function(err,booking) {
			if(err) {
				return cb(err)
			}
			return cb(null,booking)
		})
	})
}

exports.insert = function(insertObj,cb) {
	mongo.connect(config.dbPath,function(err,db) {
		if(err) {
			return cb(err)
		}
		db.collection('bookings').insert(insertObj,function(err) {
			if(err) {
				return cb(err)
			}
			return cb(null)
		})
	})
}

exports.find = function(selectCriteria,cb) {
	mongo.connect(config.dbPath,function(err,db) {
		if(err) {
			return cb(err)
		}
		db.collection('bookings').find(selectCriteria).toArray(function(err,bookings) {
			if(err) {
				return cb(err)
			}
			return cb(null,bookings)
		})
	})
}

exports.remove = function(removeCriteria,cb) {
	mongo.connect(config.dbPath,function(err,db) {
		if(err) {
			return cb(err)
		}
		db.collection('bookings').remove(removeCriteria,function(err) {
			if(err) {
				return cb(err)
			}
			return cb(null)
		})
	})
}