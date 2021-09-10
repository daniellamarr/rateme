import {create} from 'axios';
import AppStorage from '../helpers/AppStorage';

/**
 * Interacts with the Real Estate API
 * @param {Object} requestConfig Request configuration
 * @param {'post'|'get'|'delete'|'put'} requestConfig.method HTTP verb
 * @param {String} requestConfig.url HTTP verb
 * @param {Object} requestConfig.headers HTTP http header
 * @param {Object} requestConfig.data data to send to backend
 * @return {Promise<{ data, headers, status, statusText, config }>}
 */

const ratemeServiceClient = async (requestConfig) =>
  create({
    baseURL: 'https://rate-me-develop.herokuapp.com/api/v1/',
    // baseURL: 'http://localhost:8000/api/v1/',
    timeout: 150000,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': await AppStorage.getToken(),
    },
  })(requestConfig);

export default ratemeServiceClient;
