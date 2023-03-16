import { Service } from './service';
import { User } from './user';

export interface Subscription {
  id: number;
  date: Date;
  service?: Service;
  user?: User;
  period: number;
  total_price: number;
}

export interface FilterSubscriptions {
  search: string;
}

export interface SubscriptionCreate {
  date: Date;
  service: number;
  user: number;
  period: number;
  total_price: number;
}

export interface SubscriptionUpdate extends SubscriptionCreate {}
