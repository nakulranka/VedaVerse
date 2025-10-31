// Component Type Definitions for VedaVerse

// User types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// Navigation types
export type ViewType = 'welcome' | 'quiz' | 'results' | 'herbs' | 'yoga';

// Quiz types
export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
  category: 'physical' | 'mental' | 'emotional';
}

export interface QuizOption {
  text: string;
  vata: number;
  pitta: number;
  kapha: number;
}

export interface QuizResults {
  vata: number;
  pitta: number;
  kapha: number;
  dominantDosha: 'vata' | 'pitta' | 'kapha';
  percentages: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  recommendations: {
    diet: string[];
    lifestyle: string[];
    exercise: string[];
  };
}

// Component Props Types
export interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  user?: User | null;
  onAuthClick?: () => void;
}

export interface WelcomeProps {
  onStartQuiz: () => void;
  onNavigate: (view: ViewType) => void;
  user?: User | null;
  onAuthClick?: () => void;
}

export interface QuizProps {
  onComplete: (results: QuizResults) => void;
}

export interface ResultsProps {
  results: QuizResults;
  onRestart: () => void;
}

// Herb types
export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  description: string;
  benefits: string[];
  doshaEffects: {
    vata: 'increase' | 'decrease' | 'balance';
    pitta: 'increase' | 'decrease' | 'balance';
    kapha: 'increase' | 'decrease' | 'balance';
  };
  preparations: string[];
  precautions: string[];
}

// Yoga types
export interface YogaPose {
  name: string;
  sanskritName: string;
  description: string;
  benefits: string[];
  instructions: string[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface YogaSequence {
  dosha: 'vata' | 'pitta' | 'kapha';
  title: string;
  description: string;
  poses: YogaPose[];
  breathingPractices: string[];
  meditation: string;
}

// Authentication types
export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}