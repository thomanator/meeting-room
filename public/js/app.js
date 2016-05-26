var app = angular.module('meetingRoom',[]);

app.controller("MainController", function($scope,$http){
 $scope.nopeople="";
$scope.timeslot="";
$scope.chrome="";
$scope.speaker="";
$scope.tv="";
$scope.projector="";
$http({
  method :"GET",
  url:"js/data.json"
}).then(function(data){

  $scope.mydata = data.data.Response.data;

 });




});
