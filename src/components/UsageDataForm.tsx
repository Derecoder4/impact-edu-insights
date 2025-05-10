
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type FormData = {
  whatsappHours: number;
  instagramHours: number;
  tiktokHours: number;
  facebookHours: number;
  twitterHours: number;
  academicUsage: number;
  gpa: number;
};

interface UsageDataFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UsageDataForm = ({ open, onOpenChange }: UsageDataFormProps) => {
  // Get initial data from localStorage if available
  const getInitialData = () => {
    const userData = localStorage.getItem('impactEduUserData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return {
        whatsappHours: parsedData.whatsappHours || 2.5,
        instagramHours: parsedData.instagramHours || 1.0,
        tiktokHours: parsedData.tiktokHours || 0.5,
        facebookHours: parsedData.facebookHours || 0.3,
        twitterHours: parsedData.twitterHours || 0.2,
        academicUsage: parsedData.academicUsage || 22,
        gpa: parsedData.gpa || 2.5,
      };
    }
    
    return {
      whatsappHours: 2.5,
      instagramHours: 1.0,
      tiktokHours: 0.5,
      facebookHours: 0.3,
      twitterHours: 0.2,
      academicUsage: 22,
      gpa: 2.5,
    };
  };
  
  const form = useForm<FormData>({
    defaultValues: getInitialData()
  });

  const onSubmit = (data: FormData) => {
    // Add entertainment usage calculation
    const fullData = {
      ...data,
      entertainmentUsage: 100 - data.academicUsage
    };
    
    console.log('Form data submitted:', fullData);
    
    // Save data locally
    localStorage.setItem('impactEduUserData', JSON.stringify(fullData));
    
    // Force a refresh of the component to show updated data
    window.dispatchEvent(new Event('storage'));
    
    toast.success('Your usage data has been updated!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Usage Data</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Daily Hours Spent</h3>
              <div className="grid grid-cols-2 gap-4">
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
              
              <FormField
                control={form.control}
                name="academicUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Usage (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
                
              <FormField
                control={form.control}
                name="gpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current GPA</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        max="5" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UsageDataForm;
