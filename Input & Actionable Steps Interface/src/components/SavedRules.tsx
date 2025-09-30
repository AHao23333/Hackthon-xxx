import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';
import { BookmarkPlus, Play, Pause, Copy, Trash2, Calendar } from 'lucide-react';

const mockSavedRules = [
  {
    id: 1,
    name: 'Invoice Processing',
    description: 'When invoice email received, if amount > $1000, send notification and create calendar reminder',
    isActive: true,
    lastRun: '2 hours ago',
    runCount: 23,
    successRate: 98,
    category: 'Financial'
  },
  {
    id: 2,
    name: 'Customer Order Follow-up',
    description: 'When customer message about order, send tracking info and update CRM',
    isActive: true,
    lastRun: '1 day ago',
    runCount: 47,
    successRate: 94,
    category: 'Customer Service'
  },
  {
    id: 3,
    name: 'Low Stock Alert',
    description: 'When inventory photo uploaded, if low stock detected, email supplier and create purchase order',
    isActive: false,
    lastRun: '1 week ago',
    runCount: 8,
    successRate: 100,
    category: 'Inventory'
  },
  {
    id: 4,
    name: 'Daily Sales Summary',
    description: 'Every day at 6 PM, compile sales data and email summary to owner',
    isActive: true,
    lastRun: 'Yesterday',
    runCount: 156,
    successRate: 99,
    category: 'Reporting'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Financial':
      return 'bg-green-100 text-green-800';
    case 'Customer Service':
      return 'bg-blue-100 text-blue-800';
    case 'Inventory':
      return 'bg-orange-100 text-orange-800';
    case 'Reporting':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface SavedRulesProps {
  onSelectRule: (rule: any) => void;
}

export function SavedRules({ onSelectRule }: SavedRulesProps) {
  const handleToggleRule = (ruleId: number, isActive: boolean) => {
    // Toggle rule active state
    console.log(`Toggling rule ${ruleId} to ${isActive ? 'active' : 'inactive'}`);
  };

  const handleCopyRule = (rule: any) => {
    // Copy rule logic
    console.log('Copying rule:', rule.name);
  };

  const handleDeleteRule = (ruleId: number) => {
    // Delete rule logic
    console.log('Deleting rule:', ruleId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookmarkPlus className="h-5 w-5" />
          <span>Saved Rules</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="p-4 space-y-3">
            {mockSavedRules.map((rule) => (
              <Card key={rule.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm truncate">{rule.name}</h4>
                          <Badge 
                            className={getCategoryColor(rule.category)} 
                            variant="secondary"
                          >
                            {rule.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {rule.description}
                        </p>
                      </div>
                      <Switch 
                        checked={rule.isActive}
                        onCheckedChange={(checked) => handleToggleRule(rule.id, checked)}
                        className="ml-2"
                      />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>Runs: {rule.runCount}</span>
                        <span>•</span>
                        <span>Success: {rule.successRate}%</span>
                      </div>
                      <span>Last: {rule.lastRun}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs flex-1"
                        onClick={() => onSelectRule(rule)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Load
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                        onClick={() => handleCopyRule(rule)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Status indicator */}
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      rule.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {rule.isActive ? 'Active & Running' : 'Paused'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Templates */}
        {/* <div className="p-4 border-t">
          <h4 className="text-sm font-medium mb-2">Quick Templates</h4>
          <div className="space-y-1">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Calendar className="h-3 w-3 mr-2" />
              Invoice Processing Template
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Calendar className="h-3 w-3 mr-2" />
              Customer Support Template
            </Button>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}