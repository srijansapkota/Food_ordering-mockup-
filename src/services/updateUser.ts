import { showToast } from "@/components/Toast";
import { collection, doc, getFirestore, setDoc, updateDoc } from "@react-native-firebase/firestore";

const db = getFirestore();

export const updateUserProfile = async (u_id: string, name: string, address: string, phoneno: string) => {
if(!u_id) {
  showToast("User ID is required");
  return;
}
await setDoc(doc(collection(db, 'users'), u_id), { name, address, phoneno }, { merge: true }).then(() =>
  showToast("Updated Sucessfully")).catch((error) => {
    showToast("Failed to update, try again later")
    return error
  })
};