import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle, Clock, AlertTriangle, Brain, CheckSquare, Flag, Archive } from 'lucide-react';

interface AIProcessingPaneProps {
  selectedItem: any;
}

export function AIProcessingPane({ selectedItem }: AIProcessingPaneProps) {
  if (!selectedItem) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            Select an item from any tab to see AI-generated insights and suggested actions.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getInsights = (item: any) => {
    if (item.type === 'invoice') {
      return [
        `Invoice from ${item.from} for ${item.amount}`,
        `Payment due in ${item.dueDate}`,
        'High priority - requires immediate attention',
        'Vendor payment history: Good standing'
      ];
    } else if (item.customer) {
      return [
        `Customer inquiry from ${item.customer}`,
        `Platform: ${item.platform}`,
        `Priority: ${item.priority}`,
        item.orderNumber ? `Related to order ${item.orderNumber}` : 'No existing order found'
      ];
    } else if (item.name) {
      return [
        `Document type: ${item.type}`,
        `File size: ${item.size}`,
        `Processing status: ${item.status}`,
        'Extracted data available for review'
      ];
    } else if (item.title) {
      return [
        `Voice note: ${item.duration} long`,
        `Status: ${item.status}`,
        `Action items: ${item.actionItems?.length || 0} identified`,
        'Transcript available for review'
      ];
    }
    return ['AI analysis in progress...'];
  };

  const getSuggestedActions = (item: any) => {
    if (item.type === 'invoice') {
      return [
        { text: 'Add invoice to accounting system', priority: 'high' },
        { text: 'Schedule payment reminder', priority: 'medium' },
        { text: 'Update vendor records', priority: 'low' },
        { text: 'Check budget allocation', priority: 'medium' }
      ];
    } else if (item.customer) {
      return [
        { text: 'Send order status update', priority: 'high' },
        { text: 'Provide tracking information', priority: 'high' },
        { text: 'Update customer in CRM', priority: 'medium' },
        { text: 'Set follow-up reminder', priority: 'low' }
      ];
    } else if (item.name) {
      return [
        { text: 'Review extracted data', priority: 'high' },
        { text: 'Update inventory records', priority: 'medium' },
        { text: 'File document in system', priority: 'low' },
        { text: 'Send confirmation email', priority: 'medium' }
      ];
    } else if (item.title) {
      return item.actionItems?.map((action: string) => ({ 
        text: action, 
        priority: 'medium' 
      })) || [
        { text: 'Review transcript', priority: 'high' },
        { text: 'Create task from notes', priority: 'medium' }
      ];
    }
    return [];
  };

  const insights = getInsights(selectedItem);
  const actions = getSuggestedActions(selectedItem);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>AI Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Extracted Insights */}
        <div>
          <h3 className="font-medium mb-3 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Extracted Insights</span>
          </h3>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Suggested Actions */}
        <div>
          <h3 className="font-medium mb-3 flex items-center space-x-2">
            <CheckSquare className="h-4 w-4" />
            <span>Suggested Actions</span>
          </h3>
          <div className="space-y-2">
            {actions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 flex-1">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{action.text}</span>
                </div>
                <Badge 
                  variant={action.priority === 'high' ? 'destructive' : 
                          action.priority === 'medium' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {action.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve & Process
          </Button>
          <Button variant="outline" className="w-full">
            <Flag className="h-4 w-4 mr-2" />
            Flag for Review
          </Button>
          <Button variant="outline" className="w-full">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
        </div>

        {/* Processing Status */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-blue-800">AI processing complete</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Confidence score: 94% • Last updated: Just now
          </p>
        </div>
      </CardContent>
    </Card>
  );
}