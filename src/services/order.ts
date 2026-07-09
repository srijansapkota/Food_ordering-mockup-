import {
  getFirestore,
  collection,
  getDoc,
  doc,
  query,
  where,
  onSnapshot,
  updateDoc,
} from '@react-native-firebase/firestore';
import { ItemStatus, Order, OrderItem } from '@/types/types.order';

const db = getFirestore();

export const subscribeToOrders = (
  consumerId: string,
  onChange: (orders: Order[]) => void,
  onError?: (error: Error) => void
) => {
  const q = query(collection(db, 'orders'), where('consumer_id', '==', consumerId));
  return onSnapshot(
    q,
    (snap) => {
      const orders = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
      onChange(orders);
    },
    (error) => {
      console.error('subscribeToOrders error:', error);
      onError?.(error);
    }
  );
};

export const updateOrderItemStatus = async (
  orderId: string,
  menuId: number,
  status: ItemStatus
): Promise<void> => {
  const orderRef = doc(db, 'orders', orderId);
  const snap = await getDoc(orderRef);
  if (!snap.exists()) {
    throw new Error('Order not found');
  }

  const order = snap.data() as Order;
  const updatedItems = order.items.map((item) =>
    item.menu_id === menuId ? { ...item, status } : item
  );

  try {
    await updateDoc(orderRef, { items: updatedItems });
  } catch (error) {
    console.error('updateOrderItemStatus error:', error);
    throw error;
  }
};