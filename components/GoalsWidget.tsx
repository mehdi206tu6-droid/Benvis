
import React from 'react';
import { Card } from './common';
import { FinanceIcon, HealthIcon, EducationIcon, HabitsIcon } from './Icons';

interface GoalsWidgetProps {
  goals: string[];
}

const goalIcons: { [key: string]: React.ElementType } = {
  'مالی': FinanceIcon,
  'سلامتی': HealthIcon,
  'آموزش': EducationIcon,
  'عادت‌ها': HabitsIcon,
};

const GoalsWidget: React.FC<GoalsWidgetProps> = ({ goals }) => {
  return (
    <Card>
      <h3 className="font-bold text-lg mb-4">اهداف اصلی</h3>
      <div className="grid grid-cols-2 gap-4 text-center">
        {goals.map(goal => {
          const Icon = goalIcons[goal] || FinanceIcon;
          return (
            <div key={goal} className="bg-[#0F0B1A] p-4 rounded-xl">
              <Icon className="w-8 h-8 text-[#8B5CF6] mx-auto mb-2" />
              <p className="text-sm">{goal}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default GoalsWidget;
