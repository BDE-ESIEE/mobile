
const baseUrl = 'https://bde.esiee.fr/api/calendar/rooms/';

/* Work in progress */
class RoomsApi {
  /**
   * API Endpoint to search for free rooms
   *
   * @param time JS Formatted time when rooms are free
   *
   * @return Promise
   */
  static getFreeRooms (time = "") {
    return new Promise((resolve, reject) => {
      fetch(baseUrl + time, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {

        response.json().then((json) => {
          let rooms = json;
          console.log(rooms);
        });
      })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject({error: error});
      });;
    });
  }
}

module.exports = AnnalesApi;
