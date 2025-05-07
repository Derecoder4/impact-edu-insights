
import { toast } from "@/components/ui/sonner";

interface SurveyData {
  id?: string;
  userId: string;
  userName: string;
  department: string;
  whatsappHours: number;
  instagramHours: number;
  facebookHours: number;
  tiktokHours: number;
  twitterHours: number;
  academicUsage: number;
  entertainmentUsage: number;
  gpa: number;
  timestamp: string;
}

// Mock database using localStorage
class DatabaseService {
  private SURVEY_STORAGE_KEY = 'impactEduSurveys';
  
  getAllSurveys(): SurveyData[] {
    const surveys = localStorage.getItem(this.SURVEY_STORAGE_KEY);
    return surveys ? JSON.parse(surveys) : [];
  }
  
  getSurveysByUser(userId: string): SurveyData[] {
    const allSurveys = this.getAllSurveys();
    return allSurveys.filter(survey => survey.userId === userId);
  }
  
  addSurvey(survey: SurveyData): SurveyData {
    const allSurveys = this.getAllSurveys();
    const newSurvey = {
      ...survey,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };
    
    allSurveys.push(newSurvey);
    localStorage.setItem(this.SURVEY_STORAGE_KEY, JSON.stringify(allSurveys));
    toast.success("Survey submitted successfully!");
    return newSurvey;
  }
  
  // Get stats for charts
  getStats() {
    const surveys = this.getAllSurveys();
    
    if (surveys.length === 0) {
      return {
        platformUsage: [],
        gpaVsUsage: [],
        departmentAverages: []
      };
    }

    // Calculate platform usage
    const platformUsage = [
      { name: 'WhatsApp', hours: this.calculateAverage(surveys, 'whatsappHours') },
      { name: 'Instagram', hours: this.calculateAverage(surveys, 'instagramHours') },
      { name: 'Facebook', hours: this.calculateAverage(surveys, 'facebookHours') },
      { name: 'TikTok', hours: this.calculateAverage(surveys, 'tiktokHours') },
      { name: 'Twitter', hours: this.calculateAverage(surveys, 'twitterHours') }
    ];
    
    // Calculate GPA vs Usage
    const gpaVsUsage = this.calculateGpaVsUsage(surveys);
    
    // Calculate department averages
    const departmentAverages = this.calculateDepartmentAverages(surveys);
    
    return {
      platformUsage,
      gpaVsUsage,
      departmentAverages
    };
  }
  
  private calculateAverage(surveys: SurveyData[], key: keyof SurveyData) {
    return surveys.reduce((sum, survey) => sum + (survey[key] as number), 0) / surveys.length;
  }
  
  private calculateGpaVsUsage(surveys: SurveyData[]) {
    // Group surveys by total social media usage in hour ranges
    const usageGroups: Record<string, { totalGpa: number; count: number }> = {};
    
    surveys.forEach(survey => {
      const totalHours = survey.whatsappHours + survey.instagramHours + 
                        survey.facebookHours + survey.tiktokHours + survey.twitterHours;
      
      // Create hour ranges: 0-2, 2-4, 4-6, etc.
      const hourRange = `${Math.floor(totalHours / 2) * 2}-${Math.floor(totalHours / 2) * 2 + 2}`;
      
      if (!usageGroups[hourRange]) {
        usageGroups[hourRange] = { totalGpa: 0, count: 0 };
      }
      
      usageGroups[hourRange].totalGpa += survey.gpa;
      usageGroups[hourRange].count += 1;
    });
    
    return Object.entries(usageGroups).map(([range, { totalGpa, count }]) => ({
      range,
      avgGpa: totalGpa / count,
      count
    })).sort((a, b) => {
      const aStart = parseInt(a.range.split('-')[0]);
      const bStart = parseInt(b.range.split('-')[0]);
      return aStart - bStart;
    });
  }
  
  private calculateDepartmentAverages(surveys: SurveyData[]) {
    const departmentGroups: Record<string, { totalGpa: number; totalUsage: number; count: number }> = {};
    
    surveys.forEach(survey => {
      const { department, gpa } = survey;
      const totalHours = survey.whatsappHours + survey.instagramHours + 
                        survey.facebookHours + survey.tiktokHours + survey.twitterHours;
      
      if (!departmentGroups[department]) {
        departmentGroups[department] = { totalGpa: 0, totalUsage: 0, count: 0 };
      }
      
      departmentGroups[department].totalGpa += gpa;
      departmentGroups[department].totalUsage += totalHours;
      departmentGroups[department].count += 1;
    });
    
    return Object.entries(departmentGroups).map(([department, { totalGpa, totalUsage, count }]) => ({
      department,
      avgGpa: totalGpa / count,
      avgUsage: totalUsage / count,
      count
    }));
  }
}

export const databaseService = new DatabaseService();
