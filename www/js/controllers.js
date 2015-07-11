angular.module('bdeesiee.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('RoomsCtrl', function ($scope, Rooms, $ionicPopup) {
	$scope.firstLoad = true;
	$scope.doRefresh = function(){
		Rooms.zones().then(function (zones) {
			$scope.zones = zones;
			$scope.$broadcast('scroll.refreshComplete');
			$scope.firstLoad = false;
		});
	};
	$scope.doRefresh();
});