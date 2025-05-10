
import React from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DashboardHeader = () => {
  return (
    <Card className="mb-6 bg-white">
      <CardContent className="p-4 flex items-start gap-3">
        <Info className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">
            You spend <span className="font-bold">4.5 hrs/day</span> on social media. 
            <span className="font-bold"> 78%</span> of it is entertainment. 
            Your GPA is <span className="font-bold">2.5</span>. 
            Students who use <span className="font-bold">{"< 2hrs/day"}</span> average 
            <span className="font-bold text-primary"> 3.3</span>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
