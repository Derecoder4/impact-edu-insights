
import React, { useEffect, useState } from 'react';
import { databaseService } from '@/services/databaseService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const COLORS = ['#3B82F6', '#F97316', '#14B8A6', '#8B5CF6', '#EF4444'];

const DashboardCharts = () => {
  const [stats, setStats] = useState<any>({
    platformUsage: [],
    gpaVsUsage: [],
    departmentAverages: []
  });
  
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // Load stats from database service
    const data = databaseService.getStats();
    setStats(data);
  }, []);
  
  const handleFilterChange = (value: string) => {
    setFilter(value);
  };
  
  const getTotalHours = () => {
    return stats.platformUsage.reduce((sum: number, item: any) => sum + item.hours, 0);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-edu-blue">Dashboard</h2>
        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Administration">Administration</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Social Media Usage Distribution</CardTitle>
            <CardDescription>Average hours spent on each platform</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {stats.platformUsage.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.platformUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hours"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.platformUsage.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value.toFixed(1)} hours`, 'Average Usage']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>No data available</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">GPA vs Social Media Usage</CardTitle>
            <CardDescription>Average GPA by daily usage hours</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {stats.gpaVsUsage.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.gpaVsUsage}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip 
                    formatter={(value: any) => [`${value.toFixed(2)}`, 'Average GPA']}
                  />
                  <Bar dataKey="avgGpa" fill="#3B82F6" name="Average GPA" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>No data available</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Department Analysis</CardTitle>
            <CardDescription>Average GPA and social media usage by department</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {stats.departmentAverages.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.departmentAverages}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 5]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 24]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="avgGpa" fill="#3B82F6" name="Average GPA" />
                  <Bar yAxisId="right" dataKey="avgUsage" fill="#F97316" name="Average Social Media Hours" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>No data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Summary Statistics</CardTitle>
          <CardDescription>Quick overview of social media impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Daily Social Media</p>
              <p className="text-2xl font-bold">{getTotalHours().toFixed(1)} hours</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Academic Usage</p>
              <p className="text-2xl font-bold">30%</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Sample Size</p>
              <p className="text-2xl font-bold">{stats.platformUsage.length > 0 ? '3' : '0'} students</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
