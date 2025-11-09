import React, { useState } from 'react';
import { OnboardingData } from '../types';
import { Button, ProgressBar, IconWrapper } from './common';
import { WavingHandIcon, UserIcon, TargetIcon, HealthIcon, FinanceIcon, BookIcon, HabitsIcon, WaterDropIcon, WalkingIcon, MeditationIcon, BellIcon, CalendarIcon, CheckCircleIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const TOTAL_STEPS = 9;

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    fullName: '', age: '', role: '',
    selectedGoals: [], habits: [],
    budget: '', income: '', savingsGoal: '',
    health: { trackPeriod: false },
    notifications: { tasks: true, financial: false, motivation: true },
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS));

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const updateHealthData = (field: keyof OnboardingData['health'], value: any) => {
    setFormData(prev => ({ ...prev, health: { ...prev.health, [field]: value } }));
  };

  const handleComplete = () => {
    onComplete(formData);
  };
    
  const renderStep = () => {
    switch (step) {
      case 1: return <WelcomeStep nextStep={nextStep} />;
      case 2: return <IdentityStep nextStep={nextStep} updateFormData={updateFormData} data={formData} />;
      case 3: return <GoalsStep nextStep={nextStep} updateFormData={updateFormData} data={formData} />;
      case 4: return <HabitsStep nextStep={nextStep} updateFormData={updateFormData} data={formData} />;
      case 5: return <FinanceStepV2 nextStep={nextStep} updateFormData={updateFormData} data={formData} />;
      case 6: return <HealthStep nextStep={nextStep} updateHealthData={updateHealthData} data={formData} />;
      case 7: return <NotificationsStep nextStep={nextStep} updateFormData={updateFormData} data={formData} />;
      case 8: return <CalendarStep nextStep={nextStep} />;
      case 9: return <CompleteStep handleComplete={handleComplete} data={formData} />;
      default: return null;
    }
  };

  return (
    <div className="p-6 flex flex-col h-screen">
      <div className="flex items-center gap-4 mb-8">
        <p className="text-gray-400 text-sm">مرحله {step} از {TOTAL_STEPS}</p>
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      </div>
       <AnimatePresence>
        <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
        >
            {renderStep()}
        </motion.div>
       </AnimatePresence>
    </div>
  );
};

const WelcomeStep: React.FC<{ nextStep: () => void }> = ({ nextStep }) => (
    <div className="flex flex-col items-center justify-center text-center flex-grow">
        <IconWrapper><WavingHandIcon className="w-10 h-10" /></IconWrapper>
        <h1 className="text-3xl font-bold mb-2">به بنویس خوش آمدید</h1>
        <p className="text-gray-400 mb-8">Life OS شما برای مدیریت هوشمند زندگی</p>
        <div className="w-full mt-auto">
            <Button onClick={nextStep}>بزن بریم</Button>
        </div>
    </div>
);

const IdentityStep: React.FC<{ nextStep: () => void; updateFormData: (f: keyof OnboardingData, v: any) => void; data: OnboardingData }> = ({ nextStep, updateFormData, data }) => (
    <div className="flex flex-col items-center text-center flex-grow">
        <IconWrapper><UserIcon className="w-10 h-10" /></IconWrapper>
        <h2 className="text-2xl font-bold mb-2">بیایید بیشتر آشنا شویم</h2>
        <p className="text-gray-400 mb-8">اطلاعات اولیه خود را وارد کنید</p>
        <input type="text" placeholder="نام و نام خانوادگی" value={data.fullName} onChange={e => updateFormData('fullName', e.target.value)} className="w-full bg-[#1F1B2E] border border-gray-700/50 rounded-2xl p-4 mb-4 text-center" />
        <input type="text" placeholder="شغل" value={data.role} onChange={e => updateFormData('role', e.target.value)} className="w-full bg-[#1F1B2E] border border-gray-700/50 rounded-2xl p-4 mb-4 text-center" />
        <input type="number" placeholder="سن" value={data.age} onChange={e => updateFormData('age', e.target.value)} className="w-full bg-[#1F1B2E] border border-gray-700/50 rounded-2xl p-4 mb-4 text-center" />
        <div className="w-full mt-auto">
            <Button onClick={nextStep} disabled={!data.fullName || !data.role || !data.age}>ادامه</Button>
        </div>
    </div>
);

const goals = [
  { name: 'مالی', icon: FinanceIcon },
  { name: 'سلامتی', icon: HealthIcon },
  { name: 'آموزش', icon: BookIcon },
  { name: 'عادت‌ها', icon: HabitsIcon },
];

const GoalsStep: React.FC<{ nextStep: () => void; updateFormData: (f: keyof OnboardingData, v: any) => void; data: OnboardingData }> = ({ nextStep, updateFormData, data }) => {
    const toggleGoal = (goal: string) => {
        const newGoals = data.selectedGoals.includes(goal)
            ? data.selectedGoals.filter(g => g !== goal)
            : [...data.selectedGoals, goal];
        updateFormData('selectedGoals', newGoals);
    };
    return (
        <div className="flex flex-col items-center text-center flex-grow">
            <IconWrapper><TargetIcon className="w-10 h-10" /></IconWrapper>
            <h2 className="text-2xl font-bold mb-2">اهداف خود را انتخاب کنید</h2>
            <p className="text-gray-400 mb-8">چه چیزی برای شما مهم است؟</p>
            <div className="grid grid-cols-2 gap-4 w-full">
                {goals.map(({ name, icon: Icon }) => {
                    const isSelected = data.selectedGoals.includes(name);
                    return (
                        <div key={name} onClick={() => toggleGoal(name)} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${isSelected ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]' : 'bg-[#1F1B2E] border-gray-700/50'}`}>
                            <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-[#8B5CF6]' : 'text-gray-400'}`} />
                            <p>{name}</p>
                        </div>
                    );
                })}
            </div>
            <div className="w-full mt-auto">
                <Button onClick={nextStep} disabled={data.selectedGoals.length === 0}>ادامه ({data.selectedGoals.length} انتخاب شده)</Button>
            </div>
        </div>
    );
};

const habits = [
  { name: 'نوشیدن آب', icon: WaterDropIcon },
  { name: 'مطالعه', icon: BookIcon },
  { name: 'ورزش', icon: WalkingIcon },
  { name: 'مدیتیشن', icon: MeditationIcon },
];

const HabitsStep: React.FC<{ nextStep: () => void; updateFormData: (f: keyof OnboardingData, v: any) => void; data: OnboardingData }> = ({ nextStep, updateFormData, data }) => {
    const toggleHabit = (habit: string) => {
        const newHabits = data.habits.includes(habit)
            ? data.habits.filter(h => h !== habit)
            : [...data.habits, habit];
        updateFormData('habits', newHabits);
    };
    return (
        <div className="flex flex-col items-center text-center flex-grow">
            <IconWrapper><HabitsIcon className="w-10 h-10" /></IconWrapper>
            <h2 className="text-2xl font-bold mb-2">عادت‌های مثبت بسازید</h2>
            <p className="text-gray-400 mb-8">کدام عادت‌ها را می‌خواهید شروع کنید؟</p>
            <div className="space-y-3 w-full">
                {habits.map(({ name, icon: Icon }) => {
                    const isSelected = data.habits.includes(name);
                    return (
                        <div key={name} onClick={() => toggleHabit(name)} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${isSelected ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]' : 'bg-[#1F1B2E] border-gray-700/50'}`}>
                            <div className="flex items-center gap-4">
                                <Icon className={`w-6 h-6 ${isSelected ? 'text-[#8B5CF6]' : 'text-gray-400'}`} />
                                <p>{name}</p>
                            </div>
                             <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${isSelected ? 'bg-[#8B5CF6] border-[#8B5CF6]' : 'border-gray-500'}`}>
                                {isSelected && <CheckCircleIcon className="w-4 h-4 text-white" />}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-full mt-auto">
                <Button onClick={nextStep}>ادامه</Button>
            </div>
        </div>
    );
};

const FinanceStepV2: React.FC<{ nextStep: () => void; updateFormData: (f: keyof OnboardingData, v: any) => void; data: OnboardingData }> = ({ nextStep, updateFormData, data }) => (
    <div className="flex flex-col items-center text-center flex-grow">
        <IconWrapper><FinanceIcon className="w-10 h-10" /></IconWrapper>
        <h2 className="text-2xl font-bold mb-2">تنظیمات مالی FinLife</h2>
        <p className="text-gray-400 mb-8">وضعیت مالی خود را برای تحلیل هوشمند وارد کنید.</p>
        <input type="number" placeholder="درآمد ماهانه (تومان)" value={data.income} onChange={e => updateFormData('income', e.target.value)} className="w-full bg-[#1F1B2E] border border-gray-700/50 rounded-2xl p-4 mb-4 text-center" />
        <input type="number" placeholder="بودجه ماهانه (تومان)" value={data.budget} onChange={e => updateFormData('budget', e.target.value)} className="w-full bg-[#1F1B2E] border border-gray-700/50 rounded-2xl p-4 mb-4 text-center" />
        <input type="number" placeholder="هدف پس‌انداز ماهانه (تومان)" value={data.savingsGoal} onChange={e => updateFormData('savingsGoal', e.target.value)} className="w-full bg-[#1F1B2E] border border-gray-700/50 rounded-2xl p-4 mb-4 text-center" />
        <div className="w-full mt-auto">
            <Button onClick={nextStep}>ادامه</Button>
        </div>
    </div>
);

const HealthStep: React.FC<{ nextStep: () => void; updateHealthData: (f: keyof OnboardingData['health'], v: any) => void; data: OnboardingData }> = ({ nextStep, updateHealthData, data }) => {
    const isEnabled = data.health.trackPeriod;
    return (
        <div className="flex flex-col items-center text-center flex-grow">
            <IconWrapper><HealthIcon className="w-10 h-10" /></IconWrapper>
            <h2 className="text-2xl font-bold mb-2">سلامت و تندرستی</h2>
            <p className="text-gray-400 mb-8">ویژگی‌های مرتبط با سلامتی را فعال کنید.</p>
            <div onClick={() => updateHealthData('trackPeriod', !isEnabled)} className="p-4 rounded-2xl bg-[#1F1B2E] border border-gray-700/50 flex items-center justify-between cursor-pointer w-full">
                <span>ردیابی قاعدگی (برای بانوان)</span>
                <div className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${isEnabled ? 'bg-[#8B5CF6]' : 'bg-gray-600'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isEnabled ? 'transform translate-x-6' : ''}`}></div>
                </div>
            </div>
            <div className="w-full mt-auto">
                <Button onClick={nextStep}>ادامه</Button>
            </div>
        </div>
    );
};

const notificationsSettings = [
    { key: 'tasks', label: 'یادآوری وظایف'},
    { key: 'financial', label: 'گزارش مالی'},
    { key: 'motivation', label: 'انگیزه روزانه'},
];

const NotificationsStep: React.FC<{ nextStep: () => void; updateFormData: (f: keyof OnboardingData, v: any) => void; data: OnboardingData }> = ({ nextStep, updateFormData, data }) => {
    const toggleNotification = (key: 'tasks' | 'financial' | 'motivation') => {
        updateFormData('notifications', { ...data.notifications, [key]: !data.notifications[key] });
    };

    return (
        <div className="flex flex-col items-center text-center flex-grow">
            <IconWrapper><BellIcon className="w-10 h-10" /></IconWrapper>
            <h2 className="text-2xl font-bold mb-2">تنظیم اعلان‌ها</h2>
            <p className="text-gray-400 mb-8">ما شما را در مسیر نگه می‌داریم.</p>
            <div className="space-y-4 w-full">
                {notificationsSettings.map(({ key, label }) => {
                    const isEnabled = data.notifications[key as keyof typeof data.notifications];
                    return (
                        <div key={key} onClick={() => toggleNotification(key as keyof typeof data.notifications)} className="p-4 rounded-2xl bg-[#1F1B2E] border border-gray-700/50 flex items-center justify-between cursor-pointer">
                            <span>{label}</span>
                            <div className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${isEnabled ? 'bg-[#8B5CF6]' : 'bg-gray-600'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isEnabled ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-full mt-auto">
                <Button onClick={nextStep}>ادامه</Button>
            </div>
        </div>
    );
};

const CalendarStep: React.FC<{ nextStep: () => void }> = ({ nextStep }) => (
    <div className="flex flex-col items-center text-center flex-grow">
        <IconWrapper><CalendarIcon className="w-10 h-10" /></IconWrapper>
        <h2 className="text-2xl font-bold mb-2">اتصال تقویم</h2>
        <p className="text-gray-400 mb-8">رویدادها و وظایف خود را یکپارچه کنید.</p>
        <button className="w-full bg-[#1F1B2E] border border-gray-700/50 p-4 rounded-2xl mb-4 text-left">اتصال Google Calendar</button>
        <button className="w-full bg-[#1F1B2E] border border-gray-700/50 p-4 rounded-2xl mb-4 text-left">اتصال Outlook</button>
        <div className="w-full mt-auto">
            <Button onClick={nextStep}>ادامه</Button>
        </div>
    </div>
);

const CompleteStep: React.FC<{ handleComplete: () => void; data: OnboardingData }> = ({ handleComplete, data }) => (
    <div className="flex flex-col items-center justify-center text-center flex-grow">
        <IconWrapper className="bg-green-500/20"><div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white"><CheckCircleIcon className="w-10 h-10" /></div></IconWrapper>
        <h1 className="text-3xl font-bold mb-2">همه چیز آماده است!</h1>
        <p className="text-gray-400 mb-8">حالا شما می‌توانید سفر خود را به سمت شروع یک زندگی سازمان‌یافته آغاز کنید.</p>
        <div className="bg-[#1F1B2E] border border-gray-700/50 rounded-2xl p-4 w-full text-right mb-8">
            <p className="font-bold text-lg">{data.fullName}</p>
            <p className="text-gray-400">{data.role} | {data.age} ساله</p>
            <hr className="border-gray-700 my-2" />
            <p>{data.selectedGoals.length} هدف</p>
            <p>{data.habits.length} عادت</p>
            {data.income && <p>درآمد ماهانه: {parseInt(data.income).toLocaleString('fa-IR')} تومان</p>}
        </div>
        <div className="w-full mt-auto">
            <Button onClick={handleComplete}>شروع می‌کنم</Button>
        </div>
    </div>
);

export default Onboarding;