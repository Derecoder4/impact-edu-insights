
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';

const StudyTipsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-6">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 font-medium">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 bg-primary rounded-full"></div>
            <span className="text-lg">Study Habits & Focus Tips</span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-primary transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <ul className="ml-6 space-y-2 list-disc text-muted-foreground">
            <li>Use app timers during study hours</li>
            <li>Turn off notifications while reading</li>
            <li>Batch social media time into focused breaks</li>
            <li>Avoid opening TikTok before bedtime</li>
            <li>Join a study-focused WhatsApp group</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default StudyTipsPanel;
