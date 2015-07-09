angular.module('bdeesiee.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('RoomsCtrl', function ($scope, Rooms, $ionicPopup) {

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