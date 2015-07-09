angular.module('bdeesiee.services', [])

.factory('Rooms', ['$http', '$log', function ($http, $log) {
	var roomCategory = function (room) {
		if (isNaN(room))
			return 0;
		var roomNumber = parseInt(room);
		if (roomNumber > 999 && roomNumber < 8000) {
			return Math.ceil(roomNumber / 1000)
		} else {
			return 0;
		}
	};
	var zones = [
		{name:"Autres",rooms:[]},	
		{name:"Épi 1",rooms:[]},
		{name:"Épi 2",rooms:[]},
		{name:"Épi 3",rooms:[]},
		{name:"Épi 4",rooms:[]},
		{name:"Épi 5",rooms:[]},
		{name:"Épi 6",rooms:[]},
		{name:"Épi 7",rooms:[]},
	];
	var getZones = function () {
		var zonesPromise = $http.get('http://localhost:8080/api/rooms').
		then(function (data, status, headers, config) {
			
			return {
				labello: "cactus"
			};
		});
		return zonesPromise;
	}
	return {
		zones: getZones
	};
}]);