import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
/* tslint:disable-next-line */
const axiosRetry = require('axios-retry'); // https://github.com/softonic/axios-retry/issues/53

import { env, history } from 'app/config';
import { externalUrls, publicUrls, urls } from 'app/routes';
import { requestAccountToken } from 'app/services/user/userRequests';

// Retry on a network error or a 5xx error on an idempotent request https://github.com/softonic/axios-retry
// You can disable retry by request adding {'axios-retry': { retries: 0 }} to axios config
axiosRetry(axios, {
  retries: 0,
  retryCondition: (err: AxiosError) => err.config.method === 'get'
});

// Redirect to login page in case of 401
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { code } = error.response.data;
    const { pathname, href } = location;
    if (code === 'LOGIN_REQUIRED') {
      try {
        await requestAccountToken();
      } catch (e) {
        const returnUrl = encodeURIComponent(href);
        location.replace(`${externalUrls.RIDIBOOKS_LOGIN}?return_url=${returnUrl}`);
        return;
      }
      return request(error.config);
    } else if (code === 'NOT_FOUND_USER') {
      if (!publicUrls.includes(pathname)) {
        history.replace(urls.SETTINGS);
      }
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

export function request(config: RequestConfig) {
  config.baseURL = `//${process.env.RIDI_PAY_API_SERVER_HOST}`;
  config.withCredentials = true;
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json'
  };
  // Workaround to set Content-Type: https://github.com/axios/axios/issues/86
  config.data = config.data || {};
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
