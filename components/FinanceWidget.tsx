import React from 'react';
import { Card } from './common';
import { OnboardingData } from '../types';
import { FinanceIcon } from './Icons';

interface FinanceWidgetProps {
  data: OnboardingData;
}

const FinanceWidget: React.FC<FinanceWidgetProps> = ({ data }) => {
  const formatCurrency = (value: string) => {
    if (!value || isNaN(parseInt(value, 10))) return 'ثبت نشده';
    return `${parseInt(value, 10).toLocaleString('fa-IR')} تومان`;
  };

  return (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">خلاصه مالی</h3>
            <FinanceIcon className="w-6 h-6 text-gray-400" />
        </div>
        <div className="space-y-3 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-400">درآمد ماهانه:</span>
                <span>{formatCurrency(data.income)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">بودجه ماهانه:</span>
                <span>{formatCurrency(data.budget)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">هدف پس‌انداز:</span>
                <span className="text-green-400">{formatCurrency(data.savingsGoal)}</span>
            </div>
        </div>
    </Card>
  );
};

export default FinanceWidget;
