
import React, { useState, createContext, useContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { OnboardingData } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

interface AppContextType {
  userData: OnboardingData | null;
  setUserData: (data: OnboardingData | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

const App: React.FC = () => {
  const [userData, setUserData] = useLocalStorage<OnboardingData>('benvis_user_data', null);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
  };

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
        <div className="bg-[#0F0B1A] min-h-screen text-white font-sans">
            {userData ? <Dashboard /> : <Onboarding onComplete={handleOnboardingComplete} />}
        </div>
    </AppContext.Provider>
  );
};

export default App;
