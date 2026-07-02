import { getFirestore, collection, getDocs, query, where } from '@react-native-firebase/firestore';

const db = getFirestore();

export type Category = { id: number; title: string };
export type MenuItem = { id: number; title: string; price: string; category_id: number };

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const snap = await getDocs(collection(db, 'category'));
    return snap.docs.map(d => d.data() as Category);
  } catch (error) {
    console.error('fetchCategories error:', error);
    throw error;
  }
};

export const fetchMenu = async (categoryId: number): Promise<MenuItem[]> => {
  try {
    const ref = collection(db, 'AllMenus');
    const snap = categoryId === 1
      ? await getDocs(ref)
      : await getDocs(query(ref, where('category_id', '==', categoryId)));
    return snap.docs.map(d => d.data() as MenuItem);
  } catch (error) {
    console.error('fetchMenu error:', error);
    throw error;
  }
};