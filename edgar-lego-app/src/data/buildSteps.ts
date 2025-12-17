import type { BuildStep } from '../types';

// Placeholder build steps - will be replaced with actual Figma designs and assets
export const buildSteps: BuildStep[] = [
  {
    id: 0,
    type: 'build',
    content: {
      instruction: 'Start with the base foundation',
      bricks: [],
    },
  },
  {
    id: 1,
    type: 'build',
    content: {
      instruction: 'Add the first layer of blue bricks',
      bricks: [],
    },
  },
  {
    id: 2,
    type: 'build',
    content: {
      instruction: 'Build up the walls',
      bricks: [],
    },
  },
  {
    id: 3,
    type: 'question',
    content: {
      question: 'Placeholder question',
      type: 'multiple-choice',
    },
  },
  {
    id: 4,
    type: 'video',
    content: {
      videoUrl: '',
      title: 'Behind the Scenes',
      description: 'See how Edgar Allan came to life',
    },
  },
  {
    id: 5,
    type: 'build',
    content: {
      instruction: 'Add the window details',
      bricks: [],
    },
  },
  {
    id: 6,
    type: 'build',
    content: {
      instruction: 'Complete the top section',
      bricks: [],
    },
  },
  {
    id: 7,
    type: 'build',
    content: {
      instruction: 'Final touches - you are almost done!',
      bricks: [],
    },
  },
];
