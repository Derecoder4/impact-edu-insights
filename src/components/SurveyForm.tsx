
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { databaseService } from '@/services/databaseService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const SurveyForm = ({ onSubmitSuccess }: { onSubmitSuccess: () => void }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    whatsappHours: 1,
    instagramHours: 1,
    facebookHours: 0,
    tiktokHours: 0,
    twitterHours: 0,
    academicUsage: 30,
    entertainmentUsage: 70,
    gpa: 3.5
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value)
    });
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({
      ...formData,
      [name]: value[0]
    });
  };
  
  const handleUsageDistributionChange = (value: number) => {
    setFormData({
      ...formData,
      academicUsage: value,
      entertainmentUsage: 100 - value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      databaseService.addSurvey({
        ...formData,
        userId: user.matricNumber,
        userName: user.name,
        department: user.department,
        timestamp: new Date().toISOString()
      });
      
      onSubmitSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-edu-blue">Social Media Usage Survey</CardTitle>
        <CardDescription>
          Please provide information about your social media usage and academic performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hours Spent Daily on Social Media</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-[120px_1fr_80px] items-center gap-4">
                <label htmlFor="whatsappHours" className="text-sm font-medium">
                  WhatsApp
                </label>
                <Slider
                  id="whatsappHours"
                  min={0}
                  max={12}
                  step={0.5}
                  value={[formData.whatsappHours]}
                  onValueChange={(value) => handleSliderChange('whatsappHours', value)}
                  className="col-span-1"
                />
                <div className="flex items-center bg-muted rounded-md px-3 h-9">
                  <span className="text-sm">{formData.whatsappHours}h</span>
                </div>
              </div>
              
              <div className="grid grid-cols-[120px_1fr_80px] items-center gap-4">
                <label htmlFor="instagramHours" className="text-sm font-medium">
                  Instagram
                </label>
                <Slider
                  id="instagramHours"
                  min={0}
                  max={12}
                  step={0.5}
                  value={[formData.instagramHours]}
                  onValueChange={(value) => handleSliderChange('instagramHours', value)}
                />
                <div className="flex items-center bg-muted rounded-md px-3 h-9">
                  <span className="text-sm">{formData.instagramHours}h</span>
                </div>
              </div>
              
              <div className="grid grid-cols-[120px_1fr_80px] items-center gap-4">
                <label htmlFor="facebookHours" className="text-sm font-medium">
                  Facebook
                </label>
                <Slider
                  id="facebookHours"
                  min={0}
                  max={12}
                  step={0.5}
                  value={[formData.facebookHours]}
                  onValueChange={(value) => handleSliderChange('facebookHours', value)}
                />
                <div className="flex items-center bg-muted rounded-md px-3 h-9">
                  <span className="text-sm">{formData.facebookHours}h</span>
                </div>
              </div>
              
              <div className="grid grid-cols-[120px_1fr_80px] items-center gap-4">
                <label htmlFor="tiktokHours" className="text-sm font-medium">
                  TikTok
                </label>
                <Slider
                  id="tiktokHours"
                  min={0}
                  max={12}
                  step={0.5}
                  value={[formData.tiktokHours]}
                  onValueChange={(value) => handleSliderChange('tiktokHours', value)}
                />
                <div className="flex items-center bg-muted rounded-md px-3 h-9">
                  <span className="text-sm">{formData.tiktokHours}h</span>
                </div>
              </div>
              
              <div className="grid grid-cols-[120px_1fr_80px] items-center gap-4">
                <label htmlFor="twitterHours" className="text-sm font-medium">
                  Twitter
                </label>
                <Slider
                  id="twitterHours"
                  min={0}
                  max={12}
                  step={0.5}
                  value={[formData.twitterHours]}
                  onValueChange={(value) => handleSliderChange('twitterHours', value)}
                />
                <div className="flex items-center bg-muted rounded-md px-3 h-9">
                  <span className="text-sm">{formData.twitterHours}h</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Purpose Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Academic: {formData.academicUsage}%</span>
                <span className="text-sm">Entertainment: {formData.entertainmentUsage}%</span>
              </div>
              <Slider
                min={0}
                max={100}
                step={5}
                value={[formData.academicUsage]}
                onValueChange={(value) => handleUsageDistributionChange(value[0])}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Academic Performance</h3>
            <div className="grid grid-cols-[1fr_80px] items-center gap-4">
              <Slider
                min={1}
                max={5}
                step={0.1}
                value={[formData.gpa]}
                onValueChange={(value) => handleSliderChange('gpa', value)}
              />
              <Input
                name="gpa"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.gpa}
                onChange={handleInputChange}
                className="h-9"
              />
            </div>
            <p className="text-sm text-muted-foreground">Enter your GPA on a scale of 1.0 to 5.0</p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-edu-blue hover:bg-edu-indigo"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>Your data will be used to analyze correlations between social media usage and academic performance</p>
      </CardFooter>
    </Card>
  );
};

export default SurveyForm;
