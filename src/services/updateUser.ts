import { showToast } from "@/components/General/Toast";
import { collection, doc, getFirestore, setDoc } from "@react-native-firebase/firestore";

const db = getFirestore();

export const updateUserProfile = async (u_id: string, name: string, address: string, phoneno: string) => {
  if (!u_id) {
    showToast("User ID is required");
    throw new Error("User ID is required");
  }
  try {
    await setDoc(doc(collection(db, 'users'), u_id), { name, address, phoneno }, { merge: true });
    showToast("Updated Sucessfully");
  } catch (error) {
    showToast("Failed to update, try again later");
    throw error;
  }
};