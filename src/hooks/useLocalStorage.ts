"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

function subscribeToKey(key: string, onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(`local-storage:${key}`, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(`local-storage:${key}`, handler);
  };
}

/**
 * Persist state in localStorage using useSyncExternalStore.
 * The snapshot is cached by raw string so the same object reference is
 * returned when the stored value hasn't changed, preventing the
 * "getSnapshot result should be cached" infinite-loop warning.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  // Holds the last seen raw string and its parsed form
  const cache = useRef<{ raw: string | null; parsed: T } | null>(null);

  const getSnapshot = useCallback((): T => {
    try {
      const raw = window.localStorage.getItem(key);
      // Return cached reference when the raw string is unchanged
      if (cache.current !== null && cache.current.raw === raw) {
        return cache.current.parsed;
      }
      const parsed = raw !== null ? (JSON.parse(raw) as T) : initialValue;
      cache.current = { raw, parsed };
      return parsed;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const storedValue = useSyncExternalStore(
    (onStoreChange) => subscribeToKey(key, onStoreChange),
    getSnapshot,
    () => initialValue
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const raw = window.localStorage.getItem(key);
        const current = raw !== null ? (JSON.parse(raw) as T) : initialValue;
        const next = value instanceof Function ? value(current) : value;
        window.localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new Event(`local-storage:${key}`));
      } catch {
        // ignore write errors
      }
    },
    [key, initialValue]
  );

  return [storedValue, setValue, true];
}
