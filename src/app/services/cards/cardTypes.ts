export interface Card {
  payment_method_id: string;
  iin: number;
  issuer_name: string;
  color: string;
  logo_image_url: string;
  subscriptions: string[];
}
