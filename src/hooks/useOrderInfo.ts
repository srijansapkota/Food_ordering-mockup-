import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore();

interface OrderCounts {
  completed: number;
  pending: number;
  cancelled: number;
}

interface OrderItem {
  status: "completed" | "pending" | "cancelled" | string;
  [key: string]: any;
}

export const useOrderInfo = (u_id: string | null | undefined) => {
  const [counts, setCounts] = useState<OrderCounts>({
    completed: 0,
    pending: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!u_id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchOrderCounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const ordersRef = collection(db, "orders");
        const consumerQuery = query(ordersRef, where("consumer_id", "==", u_id));

        const snap = await getDocs(consumerQuery);

        const tally: OrderCounts = { completed: 0, pending: 0, cancelled: 0 };

        snap.forEach((doc) => {
          const data = doc.data();
          const items: OrderItem[] = data.items || [];

          items.forEach((item) => {
            if (item.status === "completed") tally.completed += 1;
            else if (item.status === "pending") tally.pending += 1;
            else if (item.status === "cancelled") tally.cancelled += 1;
          });
        });

        if (isMounted) setCounts(tally);
      } catch (err) {
        console.error("Error fetching order counts:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrderCounts();

    return () => {
      isMounted = false;
    };
  }, [u_id]);

  return { ...counts, loading, error };
};