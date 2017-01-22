import { AsyncStorage } from 'react-native';

const namespace = '@Lagoon:';

/**
 * Class to manage the storage
 */
class Storage {
  /**
   * Store the value by key
   * @author Naji Astier
   *
   * @param   {string}  key   the key of the value to store
   * @param   {mixed}  value  the value to store
   * @return  {Promise}       a promise
   */
  static set (key, value) {
    return AsyncStorage.setItem(namespace + key, JSON.stringify(value));
  }

  /**
   * Fetch a value from the store by key
   * @author Naji Astier
   *
   * @param  {string}  key The key of the value to Fetch
   * @return {Promise}     A promise resolving the fetched value
   */
  static get (key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(namespace + key, (error, value) => {
        if (error) {
          return reject(error);
        }
        return resolve(JSON.parse(value));
      });
    });
  }
}

module.exports = Storage;
