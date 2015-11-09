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
})

.controller('ClubsCtrl', function ($scope, Clubs) {
	$scope.firstLoad = true;
	$scope.doRefresh = function(){
		Clubs.clubs().then(function (clubs) {
			$scope.clubs = clubs;
			console.log(clubs)
			$scope.$broadcast('scroll.refreshComplete');
			$scope.firstLoad = false;
		});
	};
	$scope.doRefresh();
	
	$scope.idbidule = "";
})

.controller('NotificationsCtrl', function ($scope) {
	
})

.controller('SigninCtrl', function ($scope) {
});