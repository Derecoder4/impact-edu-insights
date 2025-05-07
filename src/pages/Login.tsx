
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue/5 to-edu-purple/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-edu-blue mb-2">ImpactEdu Insights</h1>
            <p className="text-muted-foreground">
              Discover how your social media usage impacts your academic performance
            </p>
          </div>
          
          <LoginForm />
          
          <div className="mt-8 text-center max-w-md">
            <h2 className="text-lg font-medium text-edu-blue mb-2">About ImpactEdu</h2>
            <p className="text-sm text-muted-foreground">
              ImpactEdu helps Caleb University students understand the relationship between 
              their social media habits and academic performance through data visualization 
              and personalized insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
