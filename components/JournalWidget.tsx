import React, { useState } from 'react';
import { Card } from './common';
import { Button } from './common';
import { JournalIcon } from './Icons';

const JournalWidget: React.FC = () => {
  const [entry, setEntry] = useState('');

  return (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">ژورنال روزانه</h3>
            <JournalIcon className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-400 mb-4">افکار امروز خود را ثبت کنید...</p>
        <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={4}
            className="w-full bg-[#0F0B1A] border border-gray-700/50 rounded-2xl p-3 text-sm focus:ring-1 focus:ring-[#8B5CF6] focus:outline-none"
            placeholder="امروز چطور بود؟"
        />
        <Button onClick={() => alert('یادداشت ذخیره شد!')} className="mt-4 !py-2 !text-sm">
            ذخیره یادداشت
        </Button>
    </Card>
  );
};

export default JournalWidget;
