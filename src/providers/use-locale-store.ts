import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocaleState {
    locale: string
    setLocale: (locale: string) => void;
}

export const useLocaleStore = create<LocaleState>()(
    persist(
        (set) => ({
            locale: 'pt',
            setLocale: (locale: string) => set({ locale })
        }),
        {
            name: 'locale-storage',
        }
    )
)
