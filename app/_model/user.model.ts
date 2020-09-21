import {Order, Orders} from './order.model';

export class User {
  login: string;
  email: string;
  role: [];
  orders: Order[];
}

export interface UserInfo {
  id: number;
  login: string;
  email: string;
  widelyTag: string;
  orders: [];
}
