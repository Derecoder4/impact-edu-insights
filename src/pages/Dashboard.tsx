
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SurveyForm from '@/components/SurveyForm';
import DashboardCharts from '@/components/DashboardCharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const handleSurveySuccess = () => {
    setActiveTab('dashboard');
  };
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="survey">Survey</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="dashboard">
              <DashboardCharts />
            </TabsContent>
            
            <TabsContent value="survey">
              <SurveyForm onSubmitSuccess={handleSurveySuccess} />
            </TabsContent>
          </div>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ImpactEdu - Caleb University</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
