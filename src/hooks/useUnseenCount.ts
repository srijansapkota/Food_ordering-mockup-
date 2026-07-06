import { useEffect, useState } from 'react';
import { storage } from '@/storage/storage';

/**
 * Generic "has this count grown since I last acknowledged it" tracker,
 * persisted locally via MMKV so it survives app restarts.
 *
 * Not a general notification/inbox system — just enough to drive a
 * badge dot: compare a current count against a stored baseline, and
 * let the caller reset the baseline (e.g. on bell tap).
 */
export const useUnseenCount = (storageKey: string, currentCount: number) => {
  const [lastSeenCount, setLastSeenCount] = useState<number>(() => {
    const stored = storage.getString(storageKey);
    return stored ? Number(stored) : currentCount;
  });

  // On first mount, if nothing was ever stored, treat "now" as the
  // baseline instead of showing a badge for pre-existing history.
  useEffect(() => {
    const stored = storage.getString(storageKey);
    if (stored === undefined) {
      storage.set(storageKey, String(currentCount));
      setLastSeenCount(currentCount);
    }
    // Only run once on mount for this key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const hasUnseen = currentCount > lastSeenCount;

  const acknowledge = () => {
    storage.set(storageKey, String(currentCount));
    setLastSeenCount(currentCount);
  };

  return { hasUnseen, acknowledge };
};