import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch {
            // Storage full or blocked
        }
    }, [key, storedValue]);

    const remove = useCallback(() => {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);
    }, [key, initialValue]);

    return [storedValue, setStoredValue, remove] as const;
}
