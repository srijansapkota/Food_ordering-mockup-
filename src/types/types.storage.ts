export type Item = {
  id: number,
  title: string,
  price: string,
  category: number,
  quantity?: number,
  addedAt?: number
};

export type ItemsState = {
  items: Item[];
  addItem: (item: Item) => void;
  reduceItem: (id: number) => void;
  resetItems: () => void;
  pruneExpired: () => void;
}