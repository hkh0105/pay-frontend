import {
  DeleteCardRequestPayload,
  OnetouchToggleRequestPaylaod,
  RegisterCardRequestPayload,
  RegisterCardResponse,
  RegisterPinPayload,
  UpdatePinPayload,
  ValidatePasswordPayload,
  ValidatePinPayload,
  ValidatePinResponse
} from 'app/services/user/userTypes';
import { request } from 'app/utils';
import { AxiosResponse } from 'axios';

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

export const requestRegisterPin = (payload: RegisterPinPayload) => {
  return request({
    method: 'POST',
    url: '/me/pin',
    data: payload
  });
};

export const requestUpdatePin = (payload: UpdatePinPayload) => {
  return request({
    method: 'PUT',
    url: '/me/pin',
    data: payload
  });
};

export const requestValidatePin = (payload: ValidatePinPayload) => {
  return request({
    method: 'POST',
    url: '/me/pin/validate',
    data: payload
  });
};

export const requestValidatePassword = (payload: ValidatePasswordPayload) => {
  return request({
    method: 'POST',
    url: '/me/password/validate',
    data: payload
  });
};
