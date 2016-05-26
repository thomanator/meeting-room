var app = angular.module('meetingRoom',[]);


app.controller("MainController", function($scope,$http){

$scope.basePath = 'http://localhost:3000';
 $scope.nopeople="";
$scope.timeslot="";
$scope.chrome="";
$scope.speaker="";
$scope.tv="";
$scope.projector="";

/*var req = {
  method:'get',
  url:$scope.basePath +'/dashboard',
  headers : {
    'accesstoken':'87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
  }
}*/

      $http({
         method: 'GET',
         url: $scope.basePath + '/dashboard',
         headers: {
           'accesstoken':'87d2a6926bac15bfcfb4b5a93c9eb4857f524a9d68050b502d75eeec98185ba0'
         }
       }).then(function (data) {
        console.log(data);
         $scope.mydata = data.data.data;
       });



});
