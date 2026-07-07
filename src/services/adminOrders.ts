import { collection, doc, getDoc, getFirestore, onSnapshot } from '@react-native-firebase/firestore';
import { Order } from '@/types/types.order';
import { ProfileData } from '@/types/types.userState';

const db = getFirestore();

export type AdminOrder = Order & {
  consumer: ProfileData;
};

const profileCache = new Map<string, ProfileData>();

const fetchProfile = async (uid: string): Promise<ProfileData> => {
  const cached = profileCache.get(uid);
  if (cached) return cached;

  try {
    const snap = await getDoc(doc(db, 'users', uid));
    const profile = snap.exists() ? (snap.data() as ProfileData) : {};
    profileCache.set(uid, profile);
    return profile;
  } catch (error) {
    console.error('fetchProfile error:', error);
    return {};
  }
};


export const subscribeToAllOrders = (
  onChange: (orders: AdminOrder[]) => void,
  onError?: (error: Error) => void
) => {
  return onSnapshot(
    collection(db, 'orders'),
    async (snap) => {
      const orders = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
      const withProfiles = await Promise.all(
        orders.map(async (order) => ({
          ...order,
          consumer: await fetchProfile(order.consumer_id),
        }))
      );
      onChange(withProfiles);
    },
    (error) => {
      console.error('subscribeToAllOrders error:', error);
      onError?.(error);
    }
  );
};