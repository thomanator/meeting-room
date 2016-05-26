var mongo = require('mongodb').MongoClient
var config = require('../config.js')

exports.findOne = function(selectCriteria,cb) {
	mongo.connect(config.dbPath,function(err,db) {
		if(err) {
			return cb(err)
		}
		db.collection('users').findOne(selectCriteria,function(err,user) {
			if(err) {
				return cb(null)
			}
			return cb(null,user)
		})
	})
}

exports.update = function(selectCriteria,updateCriteria,options,cb) {
	mongo.connect(config.dbPath,function(err,db) {
		if(err) {
			return cb(err)			
		}
		db.collection('users').update(selectCriteria,updateCriteria,options,function(err) {
			if(err) {
				return cb(err)
			}
			return cb(null)
		})
	})
}