
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { databaseService } from '@/services/databaseService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Insights = () => {
  const { isAuthenticated } = useAuth();
  const stats = databaseService.getStats();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Colors for charts
  const COLORS = ['#006B3C', '#A0A0A0', '#D3D3D3', '#E6E6E6', '#F2F2F2'];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-grow container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-bold">Student Insights</h2>
            </div>
            
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <Card className="p-4 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle>Social Media Usage vs. GPA</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stats.gpaVsUsage}
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="range" />
                        <YAxis domain={[0, 5]} label={{ value: 'GPA', angle: -90, position: 'insideLeft', dy: 40 }} />
                        <Tooltip formatter={(value) => value.toFixed(2)} />
                        <Bar dataKey="avgGpa" fill="#006B3C" name="Average GPA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle>Departmental Comparison</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stats.departmentAverages}
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" domain={[0, 'dataMax']} />
                        <YAxis type="category" dataKey="department" width={100} />
                        <Tooltip formatter={(value) => value.toFixed(2)} />
                        <Bar dataKey="avgGpa" fill="#006B3C" name="Average GPA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="p-4 bg-white mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Overall Class Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm mb-4">
                  <p>The data suggests that students who spend less time on social media tend to have higher GPAs. 
                  Below is an aggregated view of all student data collected so far.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-xl font-bold text-primary">{stats.gpaVsUsage.length > 0 ? stats.gpaVsUsage[0].avgGpa.toFixed(2) : "N/A"}</p>
                    <p className="text-sm text-muted-foreground">Avg. GPA for Low Usage</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-xl font-bold text-amber-600">{stats.gpaVsUsage.length > 0 ? stats.gpaVsUsage[Math.floor(stats.gpaVsUsage.length / 2)]?.avgGpa.toFixed(2) : "N/A"}</p>
                    <p className="text-sm text-muted-foreground">Avg. GPA for Medium Usage</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-xl font-bold text-rose-600">{stats.gpaVsUsage.length > 0 ? stats.gpaVsUsage[stats.gpaVsUsage.length - 1]?.avgGpa.toFixed(2) : "N/A"}</p>
                    <p className="text-sm text-muted-foreground">Avg. GPA for High Usage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
