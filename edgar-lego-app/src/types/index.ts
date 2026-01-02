// Order flow types
export interface OrderData {
  name: string;
  email: string;
  company: string;
  industry: string;
  position: string;
  address: string;
  phone?: string;
  color?: string;
  selectedProducts?: string[];
}

// Build flow types
export type StepType = 'build' | 'question' | 'video';

export interface Brick {
  id: string;
  image: string;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  animationDelay: number;
  animationDuration: number;
  animationType: 'fall' | 'slide';
}

export interface BuildStepContent {
  bricks?: Brick[];
  instruction?: string;
  image?: string;
}

export interface QuestionStepContent {
  question: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'rating';
}

export interface VideoStepContent {
  videoUrl: string;
  title?: string;
  description?: string;
}

export interface BuildStep {
  id: number;
  type: StepType;
  content: BuildStepContent | QuestionStepContent | VideoStepContent;
}

// Gallery
export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  timestamp: number;
  userName?: string;
}

// Industry and position types
export type Industry =
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'retail'
  | 'manufacturing'
  | 'other';

export type Position =
  | 'executive'
  | 'manager'
  | 'developer'
  | 'designer'
  | 'sales'
  | 'marketing'
  | 'other';
