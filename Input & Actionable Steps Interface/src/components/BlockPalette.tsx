import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Zap, 
  GitBranch, 
  Play, 
  Mail, 
  Calendar, 
  Database, 
  DollarSign,
  Package,
  User,
  FileText,
  Clock,
  Plus
} from 'lucide-react';

const blockCategories = [
  {
    name: 'Triggers',
    color: 'bg-blue-100 text-blue-800',
    icon: <Zap className="h-4 w-4" />,
    blocks: [
      {
        type: 'trigger',
        category: 'triggers',
        label: 'When new email received',
        icon: <Mail className="h-4 w-4" />,
        defaultConfig: { emailType: 'any' }
      },
      {
        type: 'trigger',
        category: 'triggers',
        label: 'When file uploaded',
        icon: <FileText className="h-4 w-4" />,
        defaultConfig: { fileType: 'any' }
      },
      {
        type: 'trigger',
        category: 'triggers',
        label: 'When customer message arrives',
        icon: <User className="h-4 w-4" />,
        defaultConfig: { platform: 'any' }
      },
      {
        type: 'trigger',
        category: 'triggers',
        label: 'On schedule (time-based)',
        icon: <Clock className="h-4 w-4" />,
        defaultConfig: { frequency: 'daily' }
      }
    ]
  },
  {
    name: 'Conditions',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <GitBranch className="h-4 w-4" />,
    blocks: [
      {
        type: 'condition',
        category: 'conditions',
        label: 'If amount greater than',
        icon: <DollarSign className="h-4 w-4" />,
        defaultConfig: { amount: 1000, comparison: 'greater' }
      },
      {
        type: 'condition',
        category: 'conditions',
        label: 'If stock level below',
        icon: <Package className="h-4 w-4" />,
        defaultConfig: { quantity: 10, comparison: 'below' }
      },
      {
        type: 'condition',
        category: 'conditions',
        label: 'If customer priority is',
        icon: <User className="h-4 w-4" />,
        defaultConfig: { priority: 'high' }
      },
      {
        type: 'condition',
        category: 'conditions',
        label: 'If document contains',
        icon: <FileText className="h-4 w-4" />,
        defaultConfig: { keyword: '' }
      }
    ]
  },
  {
    name: 'Actions',
    color: 'bg-green-100 text-green-800',
    icon: <Play className="h-4 w-4" />,
    blocks: [
      {
        type: 'action',
        category: 'actions',
        label: 'Send email notification',
        icon: <Mail className="h-4 w-4" />,
        defaultConfig: { table: 'customer database', field: 'status' }
      },
      {
        type: 'action',
        category: 'actions',
        label: 'Update Customer database record',
        icon: <Database className="h-4 w-4" />,
        defaultConfig: { recipient: 'owner', template: 'default' }
      },
      {
        type: 'action',
        category: 'actions',
        label: 'Create calendar event',
        icon: <Calendar className="h-4 w-4" />,
        defaultConfig: { duration: 30, reminder: true }
      },
      {
        type: 'action',
        category: 'actions',
        label: 'Update Sales database record',
        icon: <Database className="h-4 w-4" />,
        defaultConfig: { table: 'sales database', field: 'status' }
      },
      {
        type: 'action',
        category: 'actions',
        label: 'Update Purchase database record',
        icon: <Database className="h-4 w-4" />,
        defaultConfig: { table: 'purchase database', field: 'status' }
      },
      {
        type: 'action',
        category: 'actions',
        label: 'Add to inventory',
        icon: <Package className="h-4 w-4" />,
        defaultConfig: { location: 'warehouse', notify: true }
      },
      {
        type: 'action',
        category: 'actions',
        label: 'Remove from inventory',
        icon: <Package className="h-4 w-4" />,
        defaultConfig: { location: 'warehouse', notify: true }
      },
      {
        type: 'action',
        category: 'actions',
        label: 'Print out documents',
        icon: <Package className="h-4 w-4" />,
        defaultConfig: { location: 'office', notify: true }
      },
    ]
  }
];

interface BlockPaletteProps {
  onAddBlock: (block: any) => void;
}

export function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Rule Blocks</CardTitle>
        <p className="text-sm text-gray-600">
          Drag blocks to the canvas to build your automation rules
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="p-4 space-y-6">
            {blockCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center space-x-2 mb-3">
                  {category.icon}
                  <h3 className="font-medium">{category.name}</h3>
                  <Badge className={category.color} variant="secondary">
                    {category.blocks.length}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {category.blocks.map((block, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-3 text-left"
                      onClick={() => onAddBlock(block)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-gray-100 rounded">
                          {block.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{block.label}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Click to add to canvas
                          </div>
                        </div>
                        <Plus className="h-4 w-4 text-gray-400" />
                      </div>
                    </Button>
                  ))}
                </div>
                
                {category.name !== 'Actions' && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}