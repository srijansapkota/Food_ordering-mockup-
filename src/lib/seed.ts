import { getFirestore, doc, setDoc, Timestamp } from '@react-native-firebase/firestore';

const db = getFirestore();
const categories = [
  { id: 1, title: "All Menu" },
  { id: 2, title: "Popular items" },
  { id: 3, title: "Bakery" },
  { id: 4, title: "Snacks" },
];

const menus = [
  { id: 1, title: "Buff Momo", price: "Rs. 180", category_id: 2, image: "buffmomo_ohuvs9" },
  { id: 2, title: "Veg Momo", price: "Rs. 150", category_id: 2, image: "vegmomo_g8dtii" },
  { id: 3, title: "Chana Murai", price: "Rs. 80", category_id: 4, image: "chanamurai_vh32q0" },
  { id: 4, title: "Sel Roti", price: "Rs. 60", category_id: 3, image: "sel-roti_ook6ku" },
  { id: 5, title: "Samosa", price: "Rs. 30", category_id: 4, image: "samosa_lvnuyz" },
  { id: 6, title: "Aloo Paratha", price: "Rs. 120", category_id: 1, image: "aloo-paratha_wwvwqr" },
  { id: 7, title: "Makai Sadeko", price: "Rs. 70", category_id: 4, image: "makaisadheko_dxgs6e" },
  { id: 8, title: "Yomari", price: "Rs. 90", category_id: 3, image: "yomari_lynqqr" },
  { id: 9, title: "Chatamari", price: "Rs. 160", category_id: 2, image: "chatamari_fpzdex" },
  { id: 10, title: "Dhido", price: "Rs. 200", category_id: 1, image: "dhido_n0wk1e" },
];

export const seedData = async () => {
  for (const c of categories) await setDoc(doc(db, 'category', c.id.toString()), { ...c, createdAt: Timestamp.now() });
  for (const m of menus) await setDoc(doc(db, 'AllMenus', m.id.toString()), { ...m, createdAt: Timestamp.now() });
};