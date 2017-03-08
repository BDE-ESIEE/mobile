import Auth from '../auth';

const baseUrl = 'https://bde.esiee.fr/annales/';
const baseApiUrl = `${baseUrl}api/`;

/* global fetch */
class AnnalesApi {
  /**
   * Base request used by other API
   *
   * @param endpoint Url of the API
   * @param params GET parameters
   *
   * @return Promise
   */
  static baseRequest (endpoint, params = {}) {
    return new Promise((resolve, reject) => {
      if (!Auth.getUser()) {
        return reject({error: 'User not authentified'});
      }

      let paramsUrl = '?' + Object.keys(params).map(function (key) {
        return key + '=' + encodeURIComponent(params[key]);
      }).join('&');

      fetch(baseApiUrl + endpoint + paramsUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Auth.getUser().annales_tokens.access_token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        return resolve(responseJson);
      })
      .catch((error) => {
        return reject({error: error});
      });
    });
  }

  /**
   * Api endpoint to search for annales
   *
   * @param query Search query
   *
   * @return Promise
   */
  static searchAnnales (query, page = 1) {
    return new Promise((resolve, reject) => {
      AnnalesApi
      .baseRequest('document/search.json', {s: query, page: page})
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject({error: error});
      });
    });
  }

  /**
   * Api endpoint to fetch an annale
   *
   * @param id Annale ID
   *
   * @return Promise
   */
  static fetchAnnale (id) {
    return new Promise((resolve, reject) => {
      AnnalesApi
      .baseRequest(`document/document/${id}`)
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject({error: error});
      });
    });
  }
}

module.exports = AnnalesApi;
