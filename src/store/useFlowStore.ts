import { create } from 'zustand';

interface FlowState {
  step: number;
  userType?: string;
  situation?: string;
  setup?: string;
  concern?: string;
  note?: string;
  riskScore?: number;
  confidence?: 'Low' | 'Medium' | 'High';
  diagnosis?: string;
  setData: (data: Partial<Omit<FlowState, 'setData' | 'next' | 'reset'>>) => void;
  next: () => void;
  reset: () => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  step: 1,
  setData: (data) => set((s) => ({ ...s, ...data })),
  next: () => set((s) => ({ step: s.step + 1 })),
  reset: () => set({ 
    step: 1, 
    userType: undefined, 
    situation: undefined, 
    setup: undefined, 
    concern: undefined, 
    note: undefined, 
    riskScore: 0, 
    confidence: 'Medium', 
    diagnosis: '' 
  }),
}));
