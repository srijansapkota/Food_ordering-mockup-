import { showToast } from "@/components/Toast";
import { MissingProfileInfoError, placeOrder } from "@/services/order";
import useAuthStore from "@/store/useAuthStore";
import useItemsStore from "@/store/useItemsStore";
import { Item } from "@/types/types.storage";
import { useState } from "react";

export const handleCartItems = () => {
  const { items, reduceItem, addItem } = useItemsStore()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProfileRequiredModal, setShowProfileRequiredModal] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  const handleSubstraction = (id: number) => {
    reduceItem(id)
    showToast("Item removed from the cart")
  }

  const handleAddition = (item: Item) => {
    addItem({
      id: item.id,
      price: item.price,
      title: item.title,
      category: item.category,
      addedAt: Date.now(),
      image: item.image
    })
    }

  const handleCheckout = async () => {
    if (isSubmitting) return;

    const uid = useAuthStore.getState().user?.uid;
    if (!uid) {
      showToast("Please sign in to checkout");
      return;
    }

    setIsSubmitting(true);
    try {
      await placeOrder(uid, items);
      useItemsStore.getState().resetItems();
      showToast("Order placed successfully");
    } catch (error) {
      if (error instanceof MissingProfileInfoError) {
        setShowProfileRequiredModal(true);
      } else {
        showToast("Failed to place order. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const closeProfileRequiredModal = () => setShowProfileRequiredModal(false);

  return {
    totalItems,
    handleSubstraction,
    handleAddition,
    handleCheckout,
    isSubmitting,
    items,
    showProfileRequiredModal,
    closeProfileRequiredModal,
  };
}