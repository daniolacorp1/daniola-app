// src/stores/use-settings-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      toggleTheme: () => 
        set((state: SettingsState) => ({ 
          theme: state.theme === 'light' ? 'dark' : 'light' 
        })),
      toggleSidebar: () => 
        set((state: SettingsState) => ({ 
          sidebarOpen: !state.sidebarOpen 
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
);