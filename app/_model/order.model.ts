import {Certificate} from './certificate.model';

export interface Order {
  id: number;
  orderPrice: number;
  ownerName: string;
  creationDate: Date;
  certificates: Certificate[];
}

export class Orders {
  orders: Order[];
}

export interface Booking {
  certificates: string[];
}
