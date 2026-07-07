import { useEffect, useState } from 'react';
import { storage } from '@/storage/storage';


export const useUnseenCount = (storageKey: string, currentCount: number) => {
  const [lastSeenCount, setLastSeenCount] = useState<number>(() => {
    const stored = storage.getString(storageKey);
    return stored ? Number(stored) : currentCount;
  });


  useEffect(() => {
    const stored = storage.getString(storageKey);
    if (stored === undefined) {
      storage.set(storageKey, String(currentCount));
      setLastSeenCount(currentCount);
    }
  }, [storageKey]);

  const hasUnseen = currentCount > lastSeenCount;

  const acknowledge = () => {
    storage.set(storageKey, String(currentCount));
    setLastSeenCount(currentCount);
  };

  return { hasUnseen, acknowledge };
};