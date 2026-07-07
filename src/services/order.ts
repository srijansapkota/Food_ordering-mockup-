import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  query,
  where,
  onSnapshot,
  updateDoc,
} from '@react-native-firebase/firestore';
import { Item } from '@/types/types.storage';
import { ItemStatus, Order, OrderItem } from '@/types/types.order';

const db = getFirestore();

export class MissingProfileInfoError extends Error {
  constructor() {
    super('Fill in your info to place an order');
    this.name = 'MissingProfileInfoError';
  }
}

const hasFilledRequiredInfo = (userData: Record<string, any>) => {
  return Boolean(userData.name && userData.phoneno && userData.address);
};

export const placeOrder = async (consumerId: string, cartItems: Item[]): Promise<string> => {
  if (!consumerId) {
    throw new Error('placeOrder called without a consumer id');
  }
  if (cartItems.length === 0) {
    throw new Error('placeOrder called with an empty cart');
  }

  const userSnap = await getDoc(doc(db, 'users', consumerId));
  if (!userSnap.exists() || !hasFilledRequiredInfo(userSnap.data())) {
    throw new MissingProfileInfoError();
  }

  const items: OrderItem[] = cartItems.map((item) => ({
    menu_id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity ?? 1,
    image: item.image,
    status: 'pending',
  }));

  try {
    const ref = await addDoc(collection(db, 'orders'), {
      consumer_id: consumerId,
      items,
      createdAt: Timestamp.now(),
    });
    return ref.id;
  } catch (error) {
    console.error('placeOrder error:', error);
    throw error;
  } 
};
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