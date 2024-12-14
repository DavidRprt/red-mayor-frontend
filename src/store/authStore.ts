import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface AuthState {
  username: string | null
  isLoggedIn: boolean
  expiresAt: number | null // Fecha de expiración en milisegundos
  setUser: (username: string, expiresAt: number) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      username: null,
      isLoggedIn: false,
      expiresAt: null,
      setUser: (username, expiresAt) =>
        set({ username, isLoggedIn: true, expiresAt }),
      logout: () => set({ username: null, isLoggedIn: false, expiresAt: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const now = Date.now()
          if (state.expiresAt && now > state.expiresAt) {
          
            state.logout()
          }
        }
      },
    }
  )
)
