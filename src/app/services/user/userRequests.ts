import {
  DeleteCardRequestPayload,
  OnetouchToggleRequestPaylaod,
  RegisterCardRequestPayload,
  RegisterCardResponse
} from 'app/services/user/userTypes';
import { request } from 'app/utils';

export const requestProfile = () =>
  request({
    method: 'GET',
    url: '/me'
  });

export const requestRegisterCard = (payload: RegisterCardRequestPayload) =>
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
