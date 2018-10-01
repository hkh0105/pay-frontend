import { AddCardRequestPayload, AddCardResponse } from 'app/services/user/userTypes';
import { request } from 'app/utils';
import { AxiosPromise } from 'axios';

export const requestProfile = () =>
  request({
    method: 'GET',
    url: '/me'
  });

export const requestAddCard = (payload: AddCardRequestPayload) =>
  request({
    method: 'POST',
    url: '/me/cards',
    data: payload
  });
