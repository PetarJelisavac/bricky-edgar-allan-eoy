import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GalleryPhoto } from '../types';

interface BuildStore {
  currentStep: number;
  completedSteps: number[];
  isMusicPlaying: boolean;
  galleryPhotos: GalleryPhoto[];
  answers: Record<number, string>;

  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  toggleMusic: () => void;
  addPhoto: (photo: GalleryPhoto) => void;
  saveAnswer: (stepId: number, answer: string) => void;
  resetBuild: () => void;
}

export const useBuildStore = create<BuildStore>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      completedSteps: [],
      isMusicPlaying: false,
      galleryPhotos: [],
      answers: {},

      nextStep: () =>
        set((state) => ({
          currentStep: state.currentStep + 1,
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),

      goToStep: (step) =>
        set({
          currentStep: step,
        }),

      markStepCompleted: (step) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])],
        })),

      toggleMusic: () =>
        set((state) => ({
          isMusicPlaying: !state.isMusicPlaying,
        })),

      addPhoto: (photo) =>
        set((state) => ({
          galleryPhotos: [...state.galleryPhotos, photo],
        })),

      saveAnswer: (stepId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [stepId]: answer },
        })),

      resetBuild: () =>
        set({
          currentStep: 0,
          completedSteps: [],
          answers: {},
        }),
    }),
    {
      name: 'edgar-build-storage',
    }
  )
);
