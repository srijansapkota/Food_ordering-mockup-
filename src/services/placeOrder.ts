import { OrderItem } from "@/types/types.order";
import { Item } from "@/types/types.storage";
import { addDoc, collection, doc, getDoc, getFirestore, Timestamp } from "@react-native-firebase/firestore";


const db = getFirestore()
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