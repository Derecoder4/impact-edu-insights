
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardCharts from '@/components/DashboardCharts';
import PeerComparisonCard from '@/components/PeerComparisonCard';
import StudyTipsPanel from '@/components/StudyTipsPanel';
import UsageDataForm from '@/components/UsageDataForm';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Sidebar';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-grow container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-bold">Personal Dashboard</h2>
              <Button 
                onClick={() => setIsFormOpen(true)} 
                className="mt-2 md:mt-0"
              >
                Update My Usage Data
              </Button>
            </div>
            
            <DashboardHeader />
            <DashboardCharts />
            <PeerComparisonCard />
            <StudyTipsPanel />
            
            <UsageDataForm 
              open={isFormOpen}
              onOpenChange={setIsFormOpen}
            />
          </main>
          
          <footer className="bg-primary py-4">
            <div className="container mx-auto px-4 text-center text-white">
              <p>ImpactEdu © Caleb University 2025</p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
