import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from '@react-native-firebase/firestore';
import { Item } from '@/types/types.storage';
import { OrderItem } from '@/types/types.order';

const db = getFirestore();

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
    throw new Error('Fill in your info to place an order');
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

export const fetchOrders = async (consumerId: string) => {
  try {
    const snap = await getDocs(
      query(collection(db, 'orders'), where('consumer_id', '==', consumerId))
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('fetchOrders error:', error);
    throw error;
  }
};