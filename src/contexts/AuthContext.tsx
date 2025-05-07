
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

// Mock database of users
const MOCK_USERS = [
  { matricNumber: '123456', password: 'password123', name: 'John Doe', role: 'student', department: 'Computer Science' },
  { matricNumber: '234567', password: 'password123', name: 'Jane Smith', role: 'student', department: 'Engineering' },
  { matricNumber: 'admin', password: 'admin123', name: 'Admin User', role: 'admin', department: 'Administration' }
];

interface User {
  matricNumber: string;
  name: string;
  role: string;
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (matricNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('impactEduUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (matricNumber: string, password: string): Promise<boolean> => {
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.matricNumber === matricNumber && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('impactEduUser', JSON.stringify(userWithoutPassword));
          toast.success(`Welcome back, ${userWithoutPassword.name}!`);
          resolve(true);
        } else {
          toast.error('Invalid matric number or password');
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('impactEduUser');
    toast.info('You have been logged out');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
