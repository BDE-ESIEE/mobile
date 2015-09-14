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

.controller('ClubsCtrl', function ($scope) {
	
})

.controller('NotificationsCtrl', function ($scope) {
	
})

.controller('SigninCtrl', function ($scope) {
	$scope.googleLogin = function() {
        $cordovaOauth.google("789428888971-m22q0lj7isafsqhmj3l7ag4uv56kg7b6.apps.googleusercontent.com", ["email","profile"]).then(function(result) {
            console.log(result)
        }, function(error) {
            console.log(error)
        });
    }
});