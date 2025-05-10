
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const platformUsageData = [
  { name: 'WhatsApp', hours: 2.5 },
  { name: 'Instagram', hours: 1.0 },
  { name: 'TikTok', hours: 0.5 },
  { name: 'Facebook', hours: 0.3 },
  { name: 'Twitter', hours: 0.2 }
];

const usagePurposeData = [
  { name: 'Academic', value: 22 },
  { name: 'Entertainment', value: 78 }
];

const gpaTrendData = [
  { semester: 'Semester 1', gpa: 3.1 },
  { semester: 'Semester 2', gpa: 2.8 },
  { semester: 'Semester 3', gpa: 2.6 },
  { semester: 'Semester 4', gpa: 2.4 }
];

const COLORS = ['#006B3C', '#A0A0A0']; // Green for academic, gray for entertainment

const DashboardCharts = () => {
  // Chart configurations
  const chartConfig = {
    barChart: { academic: { color: '#006B3C' } },
    pieChart: { academic: { color: '#006B3C' }, entertainment: { color: '#A0A0A0' } },
    lineChart: { gpa: { color: '#006B3C' } }
  };

  return (
    <div className="mb-6 grid gap-6 md:grid-cols-2">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Daily Social Media Usage</h3>
        <p className="text-sm text-muted-foreground mb-4">Average hours spent on each platform</p>
        <div className="h-64">
          <ChartContainer config={chartConfig.barChart}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={platformUsageData}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" dy={10} />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft', dy: 40 }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="#006B3C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Usage Purpose</h3>
        <p className="text-sm text-muted-foreground mb-4">Academic vs Entertainment</p>
        <div className="h-64 flex items-center justify-center">
          <ChartContainer config={chartConfig.pieChart}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usagePurposeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {usagePurposeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div className="md:col-span-2 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">GPA Trend</h3>
        <p className="text-sm text-muted-foreground mb-4">Progress over semesters</p>
        <div className="h-64">
          <ChartContainer config={chartConfig.lineChart}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gpaTrendData}
                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="semester" />
                <YAxis domain={[0, 5]} label={{ value: 'GPA', angle: -90, position: 'insideLeft', dy: 40 }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="gpa" stroke="#006B3C" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
