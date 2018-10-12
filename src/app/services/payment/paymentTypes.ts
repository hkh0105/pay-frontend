export interface ReservationInformationResponse {
  required_validation: 'PASSWORD' | 'PIN' | null;
  validation_token?: string;
}

export interface CreateReservationResponse {
  return_url: string;
}
