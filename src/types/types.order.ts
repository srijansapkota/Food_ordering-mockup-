import { Timestamp } from "@react-native-firebase/firestore";

export type ItemStatus = 'pending' | 'delivered' | 'cancelled';

export type OrderItem = {
  menu_id: number;
  title: string;
  price: string;
  quantity: number;
  image: string;
  status: ItemStatus;
};

export type Order = {
  id: string;
  consumer_id: string;
  items: OrderItem[];
  createdAt: Timestamp;
};