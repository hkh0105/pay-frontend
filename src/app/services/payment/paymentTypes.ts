export interface ReservationInformationResponse {
  is_pin_validation_required: boolean;
  validation_token?: string;
}

export interface CreateReservationResponse {
  return_url: string;
}
