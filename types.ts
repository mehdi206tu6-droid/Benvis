export interface OnboardingData {
  fullName: string;
  age: string;
  role: string;
  selectedGoals: string[];
  habits: string[];
  // Financial
  budget: string;
  income: string;
  savingsGoal: string;
  // Health
  health: {
    trackPeriod: boolean;
  };
  notifications: {
    tasks: boolean;
    financial: boolean;
    motivation: boolean;
  };
}

export interface HabitStatus {
  [habitName: string]: boolean;
}