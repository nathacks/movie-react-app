import { create, StoreApi, UseBoundStore } from 'zustand';


type ToastState = {
    status?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    message: string;
}

interface ToastStoreSlice {
    toast: ToastState | null;
    showToast: (toastState: ToastState) => void;
    closeToast: () => void;
}

export type ToastStore = UseBoundStore<StoreApi<ToastStoreSlice>>;

export const useToastStore: ToastStore = create<ToastStoreSlice>((set, get) => ({
    toast: null,
    showToast: (toastState) => {
        set({ toast: toastState });
    },
    closeToast: () => {
        set({ toast: null });
    },
}));
