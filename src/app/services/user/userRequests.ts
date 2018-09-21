import { request } from 'app/utils';

export const requestProfile = () =>
  request({
    method: 'GET',
    url: '/me'
  });
