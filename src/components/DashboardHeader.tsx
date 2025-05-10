
import React from 'react';
import { InfoCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DashboardHeader = () => {
  return (
    <Card className="bg-white border-l-4 border-l-primary mb-6">
      <CardContent className="p-4 flex items-start gap-3">
        <InfoCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-base font-bold">
            You spend <span className="text-primary">4.5 hrs/day</span> on social media. 
            <span className="text-primary"> 78%</span> of it is entertainment. 
            Your GPA is <span className="text-primary">2.5</span>. 
            Students who use &lt; 2hrs/day average <span className="text-primary">3.3</span>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
