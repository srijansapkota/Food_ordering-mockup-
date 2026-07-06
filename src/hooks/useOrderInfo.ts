import { useEffect, useState } from "react";
import { subscribeToOrders } from "@/services/order";

interface OrderCounts {
  delivered: number;
  pending: number;
  cancelled: number;
}

export const useOrderInfo = (u_id: string | null | undefined) => {
  const [counts, setCounts] = useState<OrderCounts>({
    delivered: 0,
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

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToOrders(
      u_id,
      (orders) => {
        const tally: OrderCounts = { delivered: 0, pending: 0, cancelled: 0 };
        orders.forEach((order) => {
          order.items.forEach((item) => {
            if (item.status === "delivered") tally.delivered += 1;
            else if (item.status === "pending") tally.pending += 1;
            else if (item.status === "cancelled") tally.cancelled += 1;
          });
        });
        setCounts(tally);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching order counts:", err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [u_id]);

  return { ...counts, loading, error };
};