import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GalleryPhoto } from '../types';

export type BrickColorName = 'Baddy Blue' | 'Wine' | 'Sunshine' | 'Rojo' | 'Coal';

export interface BrickColorPalette {
  name: BrickColorName;
  primary: string;      // Main face color
  secondary: string;    // Side/shadow color
  tertiary: string;     // Dark side color
  highlight: string;    // Top/stud highlight
}

export const brickColorPalettes: Record<BrickColorName, BrickColorPalette> = {
  'Baddy Blue': {
    name: 'Baddy Blue',
    primary: '#0080FF',
    secondary: '#005FBE',
    tertiary: '#006DDA',
    highlight: '#169AFF',
  },
  'Wine': {
    name: 'Wine',
    primary: '#722F37',
    secondary: '#5C262D',
    tertiary: '#662B32',
    highlight: '#8B3A44',
  },
  'Sunshine': {
    name: 'Sunshine',
    primary: '#FFD700',
    secondary: '#CC9900',
    tertiary: '#E6B800',
    highlight: '#FFE44D',
  },
  'Rojo': {
    name: 'Rojo',
    primary: '#E53935',
    secondary: '#B71C1C',
    tertiary: '#C62828',
    highlight: '#EF5350',
  },
  'Coal': {
    name: 'Coal',
    primary: '#424242',
    secondary: '#212121',
    tertiary: '#303030',
    highlight: '#616161',
  },
};

interface BuildStore {
  currentStep: number;
  completedSteps: number[];
  isMusicPlaying: boolean;
  galleryPhotos: GalleryPhoto[];
  answers: Record<number, string>;
  selectedBrickColor: BrickColorName | null;

  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  toggleMusic: () => void;
  addPhoto: (photo: GalleryPhoto) => void;
  saveAnswer: (stepId: number, answer: string) => void;
  setSelectedBrickColor: (color: BrickColorName) => void;
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
      selectedBrickColor: null,

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

      setSelectedBrickColor: (color) =>
        set({
          selectedBrickColor: color,
        }),

      resetBuild: () =>
        set({
          currentStep: 0,
          completedSteps: [],
          selectedBrickColor: null,
          answers: {},
        }),
    }),
    {
      name: 'edgar-build-storage',
    }
  )
);
