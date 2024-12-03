import { create, StoreApi, UseBoundStore } from 'zustand';

interface searchBarStoreSlice {
    isSearchEnabled: boolean;
    setSearchIsEnabled: (isEnabled: boolean) => void;

    query: string;
    setQuery: (query: string) => void;
}

export type searchBarStore = UseBoundStore<StoreApi<searchBarStoreSlice>>

export const useSearchBarStore: searchBarStore = create<searchBarStoreSlice>((set, get) => ({
    isSearchEnabled: false,
    setSearchIsEnabled: (isEnabled) => {
        set({ isSearchEnabled: isEnabled });
    },

    query: '',
    setQuery: (query) => {
        set({ query });
    }
}))
