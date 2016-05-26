var mongo = require('mongodb').MongoClient
var config = require('../config.js')

mongo.connect('mongodb://localhost:27017/meeting-room',function(err,db) {
	if(err) {
		console.log(err)
	}
	else {
		db.collection('users').findOne({email:'vikramthomas93@gmail.com'},function(err,user) {
			if(err) {
				console.log(err)
			}
			else {
				console.log(user)
			}
		})
	}
})