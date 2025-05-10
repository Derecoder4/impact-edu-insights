
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { databaseService } from '@/services/databaseService';

const Insights = () => {
  const { isAuthenticated, user } = useAuth();
  const stats = databaseService.getStats();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const formatValue = (value: ValueType) => {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return value;
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-grow container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-bold">Social Media Insights</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Usage (Hours/Day)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.platformUsage}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: ValueType) => [
                          formatValue(value), 
                          "Hours/Day"
                        ]}
                      />
                      <Bar dataKey="hours" fill="#006B3C" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>GPA vs. Social Media Usage</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.gpaVsUsage}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: ValueType) => [
                          formatValue(value), 
                          "GPA"
                        ]}
                      />
                      <Bar dataKey="avgGpa" fill="#006B3C" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Department Averages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. GPA</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Usage (hrs/day)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Size</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {stats.departmentAverages.map((dept, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{dept.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dept.avgGpa.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dept.avgUsage.toFixed(1)} hrs</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dept.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
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

export default Insights;
