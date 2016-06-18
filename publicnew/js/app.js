
var app = angular.module('meeting-room',['ui.bootstrap'])

app.controller('mainController',function($scope,$http,$window,$uibModal) {		
		$http({
			method:'get',
			url: 'http://localhost:3000/dashboard',
			headers: {
				accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
			} 
		}).then(function(response) {
			$scope.rooms = response.data.data
		},function(err) {
			console.log('coming here to error')
			return err
		})

		$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return {
            	size: size,            	
            };
          }
        }
      });
		}

		$http({
			method: 'get',
			url: 'http://localhost:3000/list',
			headers: {
				accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
			}
		}).then(function(response) {
			console.log('Coming here to dropdown controller')
			$scope.bookings = response.data.data
		},function(err) {

		})

		$scope.cancel = function(booking) {
		console.log('The booking id is',booking)
		$http({
			method: 'post',
			url: 'http://localhost:3000/cancel',
			headers: {
				'content-type': 'application/json',
				accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
			},
			data: {
				bookingId: booking._id
			}
		}).then(function(response) {
			console.log(response.data)
			update()
		},function(err){
			console.log(err)
		})

	}

	function update() {
		$http({
			method: 'get',
			url: 'http://localhost:3000/list',
			headers: {

				accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
			}
		}).then(function(response) {
			
			$scope.bookings = response.data.data
			
		},function(err) {

		})
	}
})

app.controller('ModalInstanceCtrl',function($scope,$uibModalInstance,items,$http) {
		
	$scope.options = [{name: 'Today'},{name: 'Tomorrow'}]
	$scope.hstep = 1;
  $scope.mstep = 5;
  $scope.ismeridian = true;
  $scope.seconds = false

	$scope.ok = function () {
		console.log(items.name)
		console.log('Eureka',$scope.day.name)
		console.log('startTime',$scope.startTime.toTimeString().split(' ')[0])
		console.log('endTime',$scope.endTime.toTimeString().split(' ')[0])
		$http({
			method: 'post',
			url:'http://localhost:3000/reserve',
			headers: {
				'content-type': 'application/json',
				accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
			},
			data: {
				name: items.name,
				day: $scope.day.name,
				startTime: $scope.startTime.toTimeString().split(' ')[0],
				endTime: $scope.endTime.toTimeString().split(' ')[0]
			}
		}).then(function(response) {
			console.log('Successfull')
			console.log(response.data)
		},function(err) {
			console.log('error',err)
		})
    //$uibModalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

/*
app.factory('getRooms',function($http) {
	var url = 'http://localhost:3000/dashboard'
	$http({
		method:'get',
		url: url,
		headers: {
			accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
		} 
	}).then(function(response) {
		console.log(response.data.data)
		return {
			value : response.data.data
		}
	},function(err) {
		console.log('coming here to error')
		return err
	})
})*/

app.controller('dropdown',function($scope,$http) {
	
	$scope.cancel = function(booking) {
		console.log('The booking id is',booking)
		$http({
			method: 'post',
			url: 'http://localhost:3000/cancel',
			headers: {
				'content-type': 'application/json',
				accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
			},
			data: {
				bookingId: booking._id
			}
		}).then(function(response) {
			console.log(response.data)
			update()
		},function(err){
			console.log(err)
		})

	}

	function update() {
		$http({
			method: 'get',
			url: 'http://localhost:3000/list',
			headers: {

				accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
			}
		}).then(function(response) {
			
			$scope.bookings = response.data.data
			
		},function(err) {

		})
	}

	$http({
		method: 'get',
		url: 'http://localhost:3000/list',
		headers: {
			accesstoken: '87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
		}
	}).then(function(response) {
		console.log('Coming here to dropdown controller')
		$scope.bookings = response.data.data
	},function(err) {

	})
})

/*
app.controller('timePicker',function($scope) {
	$scope.hstep = 1;
  $scope.mstep = 5;
  $scope.ismeridian = true;
  $scope.seconds = false
})
*/