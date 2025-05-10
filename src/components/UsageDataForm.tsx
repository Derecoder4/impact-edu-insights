
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
  const form = useForm<FormData>({
    defaultValues: {
      whatsappHours: 2.5,
      instagramHours: 1.0,
      tiktokHours: 0.5,
      facebookHours: 0.3,
      twitterHours: 0.2,
      academicUsage: 22,
      gpa: 2.5,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data submitted:', data);
    // Simulate saving data locally
    localStorage.setItem('impactEduUserData', JSON.stringify(data));
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
                        <Input type="number" step="0.1" min="0" {...field} />
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
                        <Input type="number" step="0.1" min="0" {...field} />
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
                        <Input type="number" step="0.1" min="0" {...field} />
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
                        <Input type="number" step="0.1" min="0" {...field} />
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
                        <Input type="number" step="0.1" min="0" {...field} />
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
                      <Input type="number" min="0" max="100" {...field} />
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
                      <Input type="number" step="0.1" min="0" max="5" {...field} />
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
