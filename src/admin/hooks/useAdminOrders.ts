import { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { AdminOrder, subscribeToAllOrders } from '@/admin/services/adminOrders';
import { updateOrderItemStatus } from '@/services/order';
import { ItemStatus } from '@/types/types.order';

export default function useAdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAllOrders(
      (data) => {
        setOrders(data);
        setLoading(false);
      },
      () => {
        ToastAndroid.show('Failed to load orders', ToastAndroid.SHORT);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const setItemStatus = async (orderId: string, menuId: number, status: ItemStatus) => {
    const key = `${orderId}:${menuId}`;
    setUpdatingKey(key);
    try {
      await updateOrderItemStatus(orderId, menuId, status);
    } catch (error) {
      ToastAndroid.show('Failed to update order. Please try again.', ToastAndroid.SHORT);
    } finally {
      setUpdatingKey(null);
    }
  };

  const markDelivered = (orderId: string, menuId: number) =>
    setItemStatus(orderId, menuId, 'delivered');

  const cancelItem = (orderId: string, menuId: number) =>
    setItemStatus(orderId, menuId, 'cancelled');

  return { orders, loading, updatingKey, markDelivered, cancelItem };
};