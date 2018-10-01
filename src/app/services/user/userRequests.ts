import {
  AddCardRequestPayload,
  AddCardResponse,
  DeleteCardRequestPayload,
  OnetouchToggleRequestPaylaod
} from 'app/services/user/userTypes';
import { request } from 'app/utils';

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

export const requestDeleteCard = (payload: DeleteCardRequestPayload) => {
  request({
    method: 'DELETE',
    url: `/me/cards/${payload.payment_method_id}`
  });
};

export const requestToggleOnetouch = (payload: OnetouchToggleRequestPaylaod) => {
  request({
    method: 'PUT',
    url: '/me/onetouch',
    data: payload
  });
};