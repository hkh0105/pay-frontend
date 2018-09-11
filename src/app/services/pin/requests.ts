import { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { getMockRequest, request } from 'app/utils';

const mockRequest = getMockRequest((mock: MockAdapter) => {
  mock
    .onPost(/\/users\/(.+)\/pin\/validate/)
    .reply(200)
    .onPut(/\/users\/(.+)\/pin/)
    .reply(200);
});

export interface PinRequestParams {
  userId: string;
  pin: string;
}

export const requestPinValidation = ({ userId, pin }: PinRequestParams): Promise<AxiosResponse> =>
  // request({
  mockRequest({
    url: `/users/${userId}/pin/validate`,
    method: 'POST',
    params: { pin }
  }).then((response) => response.data);

export const requestPinRegistration = ({ userId, pin }: PinRequestParams): Promise<AxiosResponse> =>
  // request({
  mockRequest({
    url: `/users/${userId}/pin`,
    method: 'PUT',
    params: { pin }
  }).then((response) => response.data);
