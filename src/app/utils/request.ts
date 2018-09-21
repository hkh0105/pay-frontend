import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
/* tslint:disable-next-line */
const axiosRetry = require('axios-retry'); // https://github.com/softonic/axios-retry/issues/53

import { env } from 'app/config';

// Retry on a network error or a 5xx error on an idempotent request https://github.com/softonic/axios-retry
// You can disable retry by request adding {'axios-retry': { retries: 0 }} to axios config
axiosRetry(axios, {
  retries: 2,
  retryCondition: (err: AxiosError) => err.config.method === 'get'
});

// Redirect to login page in case of 401
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 404) {
      // handle 404 error
    } else if (error && error.response && error.response.status === 401) {
      window.location.replace(`${window.location.protocol}//${window.location.host}`);
    }
    return Promise.reject(error.response);
  }
);

axios.defaults.timeout = env.isProduction ? 10000 : 30000;

export interface RequestConfig extends AxiosRequestConfig {
  'axios-retry'?: {
    retries: number;
  };
}

export function request(config: RequestConfig): AxiosPromise {
  config.baseURL = process.env.API_BASE_URL;
  return axios(config);
}

const mockAxiosInstance = axios.create();
export function getMockRequest(mockHandler: (mock: MockAdapter) => void) {
  const mock = new MockAdapter(mockAxiosInstance, { delayResponse: 2000 });
  mockHandler(mock);
  return function mockRequest(config: RequestConfig): AxiosPromise {
    return axios(config);
  };
}
