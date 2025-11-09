import React, { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { HabitStatus } from '../types';
import { Card } from './common';
import { WaterDropIcon, BookIcon, WalkingIcon, MeditationIcon, CheckCircleIcon } from './Icons';

interface HabitTrackerProps {
  habits: string[];
}

const habitIcons: { [key: string]: React.ElementType } = {
  'نوشیدن آب': WaterDropIcon,
  'مطالعه': BookIcon,
  'ورزش': WalkingIcon,
  'مدیتیشن': MeditationIcon,
};

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits }) => {
  const today = new Date().toISOString().split('T')[0];
  const storageKey = `benvis_habits_${today}`;

  const initialHabitStatus = habits.reduce((acc, habit) => {
    acc[habit] = false;
    return acc;
  }, {} as HabitStatus);

  const [habitStatus, setHabitStatus] = useLocalStorage<HabitStatus>(storageKey, initialHabitStatus);

  // This effect ensures that if the user changes habits in settings (not implemented yet),
  // the tracker for today is updated.
  useEffect(() => {
    setHabitStatus(prevStatus => {
        const newStatus: HabitStatus = {};
        for (const habit of habits) {
            newStatus[habit] = prevStatus?.[habit] || false;
        }
        return newStatus;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habits, storageKey]);


  const toggleHabit = (habitName: string) => {
    setHabitStatus(prevStatus => ({
      // FIX: Ensure prevStatus is not null before spreading
      ...(prevStatus || {}),
      [habitName]: !prevStatus?.[habitName],
    }));
  };

  if (!habits || habits.length === 0) {
    return null;
  }

  return (
    <Card>
      <h3 className="font-bold text-lg mb-4">پیگیری عادت‌ها</h3>
      <div className="space-y-3">
        {habits.map(habit => {
          const isCompleted = habitStatus ? habitStatus[habit] : false;
          const Icon = habitIcons[habit] || WaterDropIcon;
          return (
            <div
              key={habit}
              onClick={() => toggleHabit(habit)}
              className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300
                ${isCompleted ? 'bg-green-500/20' : 'bg-[#0F0B1A]'}`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`w-6 h-6 ${isCompleted ? 'text-green-400' : 'text-gray-400'}`} />
                <p className={`${isCompleted ? 'line-through text-gray-400' : ''}`}>{habit}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}
              >
                {isCompleted && <CheckCircleIcon className="w-5 h-5 text-white" />}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default HabitTracker;