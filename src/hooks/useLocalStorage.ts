"use client";

import { useCallback, useSyncExternalStore } from "react";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** In-tab updates trigger re-reads via a custom event */
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
 * Persist state in localStorage using useSyncExternalStore
 * for SSR-safe reads without effect-based hydration.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const getSnapshot = useCallback(
    () => readStorage(key, initialValue),
    [key, initialValue]
  );

  const storedValue = useSyncExternalStore(
    (onStoreChange) => subscribeToKey(key, onStoreChange),
    getSnapshot,
    () => initialValue
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      const current = readStorage(key, initialValue);
      const next = value instanceof Function ? value(current) : value;
      window.localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event(`local-storage:${key}`));
    },
    [key, initialValue]
  );

  return [storedValue, setValue, true];
}
