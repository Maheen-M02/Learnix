import { create } from 'zustand'

export const useStore = create((set) => ({
  scrollProgress: 0,
  mousePosition: { x: 0, y: 0 },
  activeSection: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setMousePosition: (pos) => set({ mousePosition: pos }),
  setActiveSection: (section) => set({ activeSection: section }),
}))
