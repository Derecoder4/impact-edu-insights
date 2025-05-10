
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import SurveyForm from '@/components/SurveyForm';

const Survey = () => {
  const { isAuthenticated } = useAuth();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
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
              <h2 className="text-2xl font-bold">Social Media Usage Survey</h2>
            </div>
            
            {submissionSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">Thank You!</h3>
                <p className="mb-4">Your survey responses have been recorded successfully.</p>
                <p className="text-sm text-muted-foreground">The data will be used to help analyze patterns between social media usage and academic performance.</p>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                <SurveyForm onSubmitSuccess={() => setSubmissionSuccess(true)} />
              </div>
            )}
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

export default Survey;
