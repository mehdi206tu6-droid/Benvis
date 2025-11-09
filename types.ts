
export interface OnboardingData {
  fullName: string;
  age: string;
  role: string;
  selectedGoals: string[];
  habits: string[];
  budget: string;
  notifications: {
    tasks: boolean;
    financial: boolean;
    motivation: boolean;
  };
}

export interface HabitStatus {
  [habitName: string]: boolean;
}
