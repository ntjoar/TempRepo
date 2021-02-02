import config from './config';

/**
 * Data is a is a helper class that provides utility methods to allow React client
 * talk to the Express Server
 */

export default class Data {
  
  /**
   * method to send server request
   * @param {String} path - path to server
   * @param {String} method - GET/POST/PUT/DELETE
   * @param {Object} body 
   */
  api(path, method = 'GET', body = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options);
  }
}
