import {
  DeleteCardRequestPayload,
  OnetouchToggleRequestPaylaod,
  RegisteOrUpdatePinPayload,
  RegisterCardRequestPayload,
  RegisterCardResponse
} from 'app/services/user/userTypes';
import { request } from 'app/utils';

export const requestProfile = () => {
  return request({
    method: 'GET',
    url: '/me'
  });
};

export const requestRegisterCard = (payload: RegisterCardRequestPayload) => {
  return request({
    method: 'POST',
    url: '/me/cards',
    data: payload
  });
};

export const requestDeleteCard = (payload: DeleteCardRequestPayload) => {
  return request({
    method: 'DELETE',
    url: `/me/cards/${payload.payment_method_id}`
  });
};

export const requestToggleOnetouch = (payload: OnetouchToggleRequestPaylaod) => {
  return request({
    method: 'PUT',
    url: '/me/onetouch',
    data: payload
  });
};

export const requestRegisterOrUpdatePin = (payload: RegisteOrUpdatePinPayload) => {
  return request({
    method: 'PUT',
    url: '/me/pin',
    data: payload
  });
};
