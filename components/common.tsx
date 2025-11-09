import React from 'react';
import { HomeIcon, TargetIcon, HabitsIcon, CogIcon, PlusIcon, FinanceIcon, JournalIcon } from './Icons';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`bg-[#1F1B2E]/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 ${className}`}>
    {children}
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full bg-gradient-to-r from-[#8B5CF6] to-[#4C1D95] text-white font-bold py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6] focus:ring-offset-[#0F0B1A] disabled:opacity-50 transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);


interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;
    return (
        <div className="w-full bg-[#1F1B2E] rounded-full h-2.5">
            <div
                className="bg-[#8B5CF6] h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}
export const IconWrapper: React.FC<IconWrapperProps> = ({ children, className }) => (
    <div className={`w-24 h-24 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mb-6 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white">
            {children}
        </div>
    </div>
);

interface BottomNavProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
}
export const BottomNav: React.FC<BottomNavProps> = ({ activeItem, setActiveItem }) => {
    const navItems = [
        { name: 'داشبورد', icon: HomeIcon },
        { name: 'مالی', icon: FinanceIcon },
        { name: 'ژورنال', icon: JournalIcon },
        { name: 'تنظیمات', icon: CogIcon },
    ];

    return (
        <div className="fixed bottom-0 right-0 left-0 bg-[#1F1B2E]/80 backdrop-blur-sm border-t border-gray-700/50">
            <div className="flex justify-around items-center h-20 px-2 relative">
                {navItems.slice(0, 2).map(item => (
                    <NavItem key={item.name} item={item} isActive={activeItem === item.name} onClick={() => setActiveItem(item.name)} />
                ))}
                <div className="w-16 h-16"></div>
                {navItems.slice(2, 4).map(item => (
                    <NavItem key={item.name} item={item} isActive={activeItem === item.name} onClick={() => setActiveItem(item.name)} />
                ))}
            </div>
            <div className="absolute top-[-28px] left-1/2 -translate-x-1/2">
                <button className="w-16 h-16 bg-gradient-to-r from-[#8B5CF6] to-[#4C1D95] rounded-full flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
                    <PlusIcon className="w-8 h-8 text-white" />
                </button>
            </div>
        </div>
    );
};

const NavItem: React.FC<{item: {name: string, icon: React.ElementType}, isActive: boolean, onClick: ()=>void}> = ({ item, isActive, onClick }) => {
    const Icon = item.icon;
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${isActive ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>
            <Icon className="w-6 h-6" />
            <span className="text-xs">{item.name}</span>
        </button>
    );
};