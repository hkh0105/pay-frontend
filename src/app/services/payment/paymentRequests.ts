import { request } from 'app/utils';

export const requestReservationInformation = (id: string) => {
  return request({
    method: 'GET',
    url: `/payments/subscriptions/${id}`
  });
};

export const requestCreatePayment = (reservationId: string, validationToken: string) => {
  return request({
    method: 'POST',
    url: `/payments/subscriptions/${reservationId}`,
    data: {
      validation_token: validationToken
    }
  });
};
