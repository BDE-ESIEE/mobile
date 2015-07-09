angular.module('bdeesiee.services', [])

.factory('Rooms', ['$http', '$log', function ($http, $log) {

	return {
		all: function () {
			var roomsPromise = $http.get('http://localhost:8080/api/rooms').
			then(function (data, status, headers, config) {
				return {
					labello: "cactus"
				};
			});
			return roomsPromise;
		}
	};
}]);