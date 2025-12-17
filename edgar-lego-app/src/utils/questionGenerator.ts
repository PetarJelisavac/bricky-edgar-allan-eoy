interface Question {
  question: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'rating';
}

const questionBank: Record<string, Record<string, Question[]>> = {
  technology: {
    executive: [
      {
        question: 'What is your biggest challenge in digital transformation?',
        options: [
          'Legacy systems integration',
          'Team adoption',
          'Budget constraints',
          'Security concerns',
        ],
        type: 'multiple-choice',
      },
      {
        question: 'How do you measure tech ROI in your organization?',
        type: 'text',
      },
    ],
    developer: [
      {
        question: 'What is your favorite programming paradigm?',
        options: [
          'Object-Oriented',
          'Functional',
          'Procedural',
          'Reactive',
        ],
        type: 'multiple-choice',
      },
      {
        question: 'Describe your ideal development workflow.',
        type: 'text',
      },
    ],
    manager: [
      {
        question: 'How do you prioritize technical debt vs new features?',
        options: [
          '80% features, 20% debt',
          '50/50 split',
          '70% debt, 30% features',
          'Depends on sprint goals',
        ],
        type: 'multiple-choice',
      },
    ],
  },
  healthcare: {
    executive: [
      {
        question: 'What is your top priority in patient care innovation?',
        options: [
          'Telemedicine',
          'Data analytics',
          'Patient experience',
          'Cost reduction',
        ],
        type: 'multiple-choice',
      },
    ],
    doctor: [
      {
        question: 'How has technology improved your practice?',
        type: 'text',
      },
    ],
  },
  finance: {
    executive: [
      {
        question: 'What fintech trend excites you most?',
        options: [
          'Blockchain',
          'AI in trading',
          'Mobile banking',
          'RegTech',
        ],
        type: 'multiple-choice',
      },
    ],
  },
  default: [
    {
      question: 'What inspires you most about building things?',
      options: [
        'Creative expression',
        'Problem solving',
        'Collaboration',
        'End results',
      ],
      type: 'multiple-choice',
    },
    {
      question: 'Share a moment when teamwork made a difference.',
      type: 'text',
    },
  ],
};

export function getQuestionForUser(
  industry: string,
  position: string,
  stepNumber: number
): Question {
  // Try to get industry-specific, position-specific question
  const industryQuestions = questionBank[industry];
  if (industryQuestions) {
    const positionQuestions = industryQuestions[position];
    if (positionQuestions && positionQuestions[stepNumber]) {
      return positionQuestions[stepNumber];
    }
    // Fallback to any position in that industry
    const anyPositionQuestions = Object.values(industryQuestions).flat();
    if (anyPositionQuestions[stepNumber]) {
      return anyPositionQuestions[stepNumber];
    }
  }

  // Fallback to default questions
  const defaultQuestions = questionBank.default;
  return (
    defaultQuestions[stepNumber % defaultQuestions.length] || defaultQuestions[0]
  );
}
