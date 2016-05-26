var bcrypt = require('bcrypt-nodejs')
var mongo = require('mongodb').MongoClient

var user = {
	firstName : 'Shashank',
	lastName : 'Sahay',
	email : 'shashank.sahay@gmail.com',
	password : 'dragonrider',
	firstLogin : true
}

bcrypt.hash('kingkong',null,null,function(err,hash) {
	if(err) {
		console.log(err)
	}
	else {
		user['password'] = hash
		mongo.connect('mongodb://localhost:27017/meeting-room',function(err,db) {
			if(err) {
				console.log(err)
			}
			else {
				db.collection('users').insert(user,function(err) {
					if(err) {
						console.log(err)
					}
					else {
						console.log('Successfully done')
					}
				})
			}
		})		
	}
})
