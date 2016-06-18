var bcrypt = require('bcrypt-nodejs')
var crypto = require('crypto')
var userModel = require('../models/user.js')

exports.compare = function(password,check,cb) {	
	bcrypt.compare(password,check,function(err,result) {
		if(err) {
			return cb(err)
		}
		console.log('result',result)
		return cb(null,result)
	})	
}

exports.genAccessToken = function(cb) {
	var token = new Date().toString()							
	var accessToken = crypto.createHash('sha256').update(token).digest('hex');
	return cb(null,accessToken)
}

exports.errorMessage = function(err,res) {
	var resJson = {
		status : 'failure',
		message : err,
		data : null
	}
}

exports.authenticateUser = function(accessToken,res,cb) {
	
	console.log('access token',accessToken)
	userModel.findOne({accessToken:accessToken},function(err,user) {
		if(err) {
			return cb(err)
		}		
		if(!user) {
			res.sendStatus(403)
		}
		else {
			return cb(null,user)
		}
	})
}