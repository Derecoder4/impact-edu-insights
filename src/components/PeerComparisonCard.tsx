
import React from 'react';
import { Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PeerComparisonCard = () => {
  return (
    <Card className="bg-white mb-6">
      <CardContent className="p-4 flex items-start gap-3">
        <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">
            Compared to other students, your entertainment usage is 
            <span className="font-bold"> higher than average</span>. 
            Most students who spend less than 2 hrs/day on social media 
            average a GPA of <span className="font-bold text-primary">3.3</span>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerComparisonCard;
