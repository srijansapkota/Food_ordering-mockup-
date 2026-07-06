import { showToast } from "@/components/Toast";
import { collection, doc, getFirestore, setDoc } from "@react-native-firebase/firestore";

const db = getFirestore();

export const updateUserProfile = async (u_id: string, name: string, address: string, phoneno: string) => {
  console.log('[updateUserProfile] called with', { u_id, name, address, phoneno });

  if (!u_id) {
    showToast("User ID is required");
    throw new Error("User ID is required");
  }
  try {
    console.log('[updateUserProfile] about to setDoc');
    
    // Add a 10-second timeout to prevent infinite hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Network timeout: setDoc took too long")), 10000)
    );
    
    const setDocPromise = setDoc(doc(collection(db, 'users'), u_id), { name, address, phoneno }, { merge: true });
    
    await Promise.race([setDocPromise, timeoutPromise]);
    
    console.log('[updateUserProfile] setDoc resolved successfully');
    showToast("Updated Sucessfully");
  } catch (error) {
    console.log('[updateUserProfile] setDoc THREW', error);
    showToast("Failed to update, try again later");
    throw error;
  }
};