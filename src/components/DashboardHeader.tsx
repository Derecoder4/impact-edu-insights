
import React from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DashboardHeader = () => {
  // Get user data from localStorage, or use defaults if none exist
  const getUserData = () => {
    const userData = localStorage.getItem('impactEduUserData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return {
        totalHours: (
          parsedData.whatsappHours +
          parsedData.instagramHours +
          parsedData.tiktokHours +
          parsedData.facebookHours +
          parsedData.twitterHours
        ).toFixed(1),
        entertainmentPercentage: (100 - parsedData.academicUsage),
        gpa: parsedData.gpa,
      };
    }
    
    // Default values if no user data exists
    return {
      totalHours: "4.5",
      entertainmentPercentage: 78,
      gpa: 2.5
    };
  };

  const userData = getUserData();

  return (
    <Card className="mb-6 bg-white">
      <CardContent className="p-4 flex items-start gap-3">
        <Info className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">
            You spend <span className="font-bold">{userData.totalHours} hrs/day</span> on social media. 
            <span className="font-bold"> {userData.entertainmentPercentage}%</span> of it is entertainment. 
            Your GPA is <span className="font-bold">{userData.gpa}</span>. 
            Students who use <span className="font-bold">{"< 2hrs/day"}</span> average 
            <span className="font-bold text-primary"> 3.3</span>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
