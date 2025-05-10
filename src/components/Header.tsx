
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">
              ImpactEdu<span className="hidden sm:inline"> Insights</span>
            </h1>
            <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded">Beta</span>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Welcome, {user.name}</p>
              <p className="text-xs text-muted-foreground">Dept: {user.department}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
