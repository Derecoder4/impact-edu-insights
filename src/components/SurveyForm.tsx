
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/contexts/AuthContext';
import { databaseService } from '@/services/databaseService';
import { toast } from 'sonner';

interface SurveyFormProps {
  onSubmitSuccess: () => void;
}

type FormData = {
  department: string;
  whatsappHours: number;
  instagramHours: number;
  tiktokHours: number;
  facebookHours: number;
  twitterHours: number;
  academicUsage: number;
  entertainmentUsage: number;
  gpa: number;
};

const SurveyForm = ({ onSubmitSuccess }: SurveyFormProps) => {
  const { user } = useAuth();
  
  // Initialize with data from localStorage if available
  const getUserInitialData = () => {
    const userData = localStorage.getItem('impactEduUserData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return {
        department: 'Computer Science',
        whatsappHours: parsedData.whatsappHours || 2.5,
        instagramHours: parsedData.instagramHours || 1.0,
        tiktokHours: parsedData.tiktokHours || 0.5,
        facebookHours: parsedData.facebookHours || 0.3,
        twitterHours: parsedData.twitterHours || 0.2,
        academicUsage: parsedData.academicUsage || 22,
        entertainmentUsage: 100 - (parsedData.academicUsage || 22),
        gpa: parsedData.gpa || 2.5,
      };
    }
    
    return {
      department: 'Computer Science',
      whatsappHours: 2.5,
      instagramHours: 1.0,
      tiktokHours: 0.5,
      facebookHours: 0.3,
      twitterHours: 0.2,
      academicUsage: 22,
      entertainmentUsage: 78,
      gpa: 2.5,
    };
  };

  const form = useForm<FormData>({
    defaultValues: getUserInitialData()
  });

  const academicUsage = form.watch('academicUsage');
  
  // Update entertainment usage when academic usage changes
  React.useEffect(() => {
    form.setValue('entertainmentUsage', 100 - academicUsage);
  }, [academicUsage, form]);

  const onSubmit = (data: FormData) => {
    // Save to localStorage for persistence
    localStorage.setItem('impactEduUserData', JSON.stringify(data));
    
    // Add to database service
    databaseService.addSurvey({
      userId: user?.id || 'anonymous',
      userName: user?.name || 'Anonymous User',
      department: data.department,
      whatsappHours: data.whatsappHours,
      instagramHours: data.instagramHours,
      facebookHours: data.facebookHours,
      tiktokHours: data.tiktokHours,
      twitterHours: data.twitterHours,
      academicUsage: data.academicUsage,
      entertainmentUsage: data.entertainmentUsage,
      gpa: data.gpa,
      timestamp: new Date().toISOString()
    });
    
    toast.success("Survey submitted successfully!");
    onSubmitSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Business Administration">Business Administration</SelectItem>
                  <SelectItem value="Mass Communication">Mass Communication</SelectItem>
                  <SelectItem value="Accounting">Accounting</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <div className="border rounded-md p-4 space-y-4">
          <h3 className="font-medium text-lg mb-2">Daily Hours Spent on Social Media</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="whatsappHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="instagramHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tiktokHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TikTok</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="facebookHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="twitterHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="academicUsage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Usage (%)</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between">
                    <span>Academic: {field.value}%</span>
                    <span>Entertainment: {100 - field.value}%</span>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Move the slider to indicate how much of your social media time is for academic purposes
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="gpa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current GPA (0-5)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  max="5" 
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" size="lg">Submit Survey</Button>
        </div>
      </form>
    </Form>
  );
};

export default SurveyForm;
