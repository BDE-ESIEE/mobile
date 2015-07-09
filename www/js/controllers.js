angular.module('bdeesiee.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('RoomsCtrl', function ($scope, Rooms, $ionicPopup) {
	var roomCategory = function(room) {
		if(isNaN(room))
			return 0;
		var roomNumber = parseInt(room);
		if(roomNumber > 999 && roomNumber < 8000) {
			return Math.ceil(roomNumber/1000)
		} else {
			return 0;
		}
	}
	$scope.zones = [
		{name:"Autres",rooms:[]},	
		{name:"Épi 1",rooms:[]},
		{name:"Épi 2",rooms:[]},
		{name:"Épi 3",rooms:[]},
		{name:"Épi 4",rooms:[]},
		{name:"Épi 5",rooms:[]},
		{name:"Épi 6",rooms:[]},
		{name:"Épi 7",rooms:[]},
	]
	$scope.doRefresh = function(){
		Rooms.all().then(function (data) {
			console.log(data);
			$scope.rooms = data.data;
			$scope.$broadcast('scroll.refreshComplete');
			$scope.firstLoad = false;
		});
	};
	$scope.doRefresh();
});