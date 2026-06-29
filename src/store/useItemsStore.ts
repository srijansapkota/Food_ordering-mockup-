import { zustandStorage } from '@/storage/storage';
import { Item, ItemsState } from '@/types/types.storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useItemsStore = create<ItemsState>()(persist((set, get) => ({
  items: [],
  addItem: (item: Item) => set((state) => {
    const existing = state.items.find((i)=> i.id === item.id)
 
  if(existing) {
    return {
      items: state.items.map((i)=> i.id === item.id ? {...i, quantity: (i.quantity ?? 0) + 1} : i)
    }
  }
    return { items: [...state.items, { ...item, quantity: 1 }] }
   }),
  reduceItem: (id: number) => set((state) => {
      return {
        items: state.items
          .map((i) => i.id === id ? { ...i, quantity: i.quantity! - 1 } : i)
          .filter((i) => i.quantity! > 0),
      };
    
    }),
  resetItems: () => set({ items: [] }),
}),

  {
    name: 'Item-count',
  storage: createJSONStorage(() => zustandStorage),
}));

export default useItemsStore;

