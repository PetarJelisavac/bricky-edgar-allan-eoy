import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderData } from '../types';

interface OrderStore {
  userData: Partial<OrderData>;
  currentStep: number;
  setUserData: (data: Partial<OrderData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOrder: () => void;
  submitOrder: () => Promise<void>;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      userData: {},
      currentStep: 1,

      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 5),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      resetOrder: () =>
        set({
          userData: {},
          currentStep: 1,
        }),

      submitOrder: async () => {
        const { userData } = get();
        // TODO: Implement email sending via EmailJS
        console.log('Submitting order:', userData);

        // Placeholder for email service
        try {
          // await emailjs.send(...)
          console.log('Order submitted successfully');
        } catch (error) {
          console.error('Error submitting order:', error);
          throw error;
        }
      },
    }),
    {
      name: 'edgar-order-storage',
    }
  )
);
