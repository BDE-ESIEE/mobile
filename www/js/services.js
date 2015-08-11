angular.module('bdeesiee.services', [])

.factory('Rooms', ['$http', '$log', function ($http, $log) {
	var roomCategory = function (room) {
		if (isNaN(room))
			return 0;
		var roomNumber = parseInt(room);
		if (roomNumber > 999 && roomNumber < 8000) {
			return Math.floor(roomNumber / 1000)
		} else {
			return 0;
		}
	};
	var getZones = function () {
		var zonesPromise = $http.get('https://bde.esiee.fr/api/calendar/rooms').
		then(function (response) {
			var list = response.data;
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
			_.each(list,function(room){
				zones[roomCategory(room)].rooms.push(room)
			});
			return zones;
		});
		return zonesPromise;
	}
	var getRooms = function () {
		var roomsPromise = $http.get('https://bde.esiee.fr/api/calendar/rooms').
		then(function (response) {
			return response.data;
		});
		return roomsPromise;
	}		
	return {
		zones: getZones,
		rooms: getRooms
	};
}]);