import {Order} from './order.model';

export class User {
  id: number;
  login: string;
  email: string;
  role: [];
  orders: Order[];
}
