import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, PersistStorage, StateStorage } from 'zustand/middleware';

export function createMmkvStorage<T>(id: string): PersistStorage<T> | undefined {
    const mmkv = new MMKV({ id });
    const storage: StateStorage = {
        setItem: (name, value) => mmkv.set(name, value),
        getItem: (name) => mmkv.getString(name) ?? null,
        removeItem: (name) => mmkv.delete(name),
    };
    return createJSONStorage(() => storage);
}
