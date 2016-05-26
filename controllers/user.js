
function user() {
	var async = require('async') 
	var userModel = require('../models/user.js')
	var common = require('../utils/common.js')	

	this.login = function(req,res) {
		var resJson = {
			staus : 'success',
			message : '',
			data : ''
		}
		userModel.findOne({email:req.body.email},function(err,user) {
			if(err) {
				common.errorMessage(err,res)
			}
			if(!user) {
				return res.json({
					status : 'success',
					message : 'Username does not exist',
					data : null
				})
			}
			else {
				console.log('user',user)

				if(user.firstLogin == true) {

					var err = 'First login, you have to change your password'
					return res.json({
						status : 'success',
						message : err,
						data : null				
					})
					//common.errorMessage(err,res)
					//res.redirect('https://gmail.com')
				}		

				common.compare(req.body.password,user.password,function(err,result) {					
					if(err) {
						common.errorMessage(err,res)
					}					
					if(result == true) {
						common.genAccessToken(function(err,token) {
							if(err) {
								common.errorMessage(err,res)
							}
							userModel.update({email:user.email},{$set:{accessToken:token}},{},function(err) {
								if(err) {
									common.errorMessage(err,res)									
								}								
								resJson['data'] = token
								res.json(resJson)	
							})
						})
					}
					else {
						return res.json({
							status : 'success',
							message : 'Wrong password!',
							data : null	
						})
					}
				})
			}
		})
	}
}

module.exports = new user()