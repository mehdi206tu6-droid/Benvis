
import React, { useState } from 'react';
import { useAppContext } from '../App';
import { BottomNav, Card } from './common';
import { OnboardingData } from '../types';
import HabitTracker from './HabitTracker';
import GoalsWidget from './GoalsWidget';

const Dashboard: React.FC = () => {
    const { userData } = useAppContext();
    const [activeItem, setActiveItem] = useState('داشبورد');

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="p-6">
                <h1 className="text-3xl font-bold">داشبورد</h1>
                <p className="text-gray-400">سلام {userData.fullName}، روز خوبی داشته باشید!</p>
            </header>

            <main className="flex-grow p-6 space-y-6 overflow-y-auto pb-28">
                <GoalsWidget goals={userData.selectedGoals} />
                <HabitTracker habits={userData.habits} />
                
                {/* Placeholder Widgets */}
                <Card>
                    <h3 className="font-bold text-lg mb-2">خلاصه مالی</h3>
                    <p className="text-gray-400">داده‌های مالی به زودی در اینجا نمایش داده می‌شوند.</p>
                </Card>
                <Card>
                    <h3 className="font-bold text-lg mb-2">آب و هوا</h3>
                    <p className="text-gray-400">ویجت آب و هوا به زودی اضافه خواهد شد.</p>
                </Card>
            </main>

            <BottomNav activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
    );
};

export default Dashboard;
