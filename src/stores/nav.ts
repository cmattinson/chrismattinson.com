import { create } from "zustand";

interface NavState {
    selected: number;
    searchMode: boolean;
    setSearchMode: (value: boolean) => void;
    setSelected: (value: number) => void;
}

export const useNavStore = create<NavState>((set) => ({
    selected: 0,
    searchMode: false,
    setSelected: (value: number) => set(() => ({ selected: value })),
    setSearchMode: (value: boolean) => set(() => ({ searchMode: value })),
}));
