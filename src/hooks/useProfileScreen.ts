import { showToast } from "@/components/General/Toast";
import useAuthStore from "@/store/useAuthStore";
import { ProfileData } from "@/types/types.userState";
import { collection, doc, getDoc, getFirestore } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore()


export const useProfileScreen =  () => {
  const [profileData, setProfileData] = useState<ProfileData>({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {  
    const fetchData = async () => {
      const uid = useAuthStore.getState().user?.uid;
      if (!uid) {
        showToast("Please sign in to checkout");
        return;
      }
      try {
        setLoading(true)
        const docRef = doc(collection(db, 'users'), uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setProfileData(docSnap.data() as ProfileData)
        }
      } catch (error) {
        console.error(error)
        return error
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  const applyLocalUpdate = (update: ProfileData) => {
    setProfileData((prev) => ({ ...prev, ...update }))
  }

  return { ...profileData, loading, applyLocalUpdate }
}