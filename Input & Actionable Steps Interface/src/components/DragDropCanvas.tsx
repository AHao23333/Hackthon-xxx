import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Settings, Move } from 'lucide-react';

interface Block {
  id: number;
  type: string;
  category: string;
  label: string;
  config: any;
  x: number;
  y: number;
}

interface DragDropCanvasProps {
  blocks: Block[];
  onUpdateBlock: (blockId: number, updates: any) => void;
  onRemoveBlock: (blockId: number) => void;
}

export function DragDropCanvas({ blocks, onUpdateBlock, onRemoveBlock }: DragDropCanvasProps) {
  const [draggedBlock, setDraggedBlock] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingBlock, setEditingBlock] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent, blockId: number) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDraggedBlock(blockId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedBlock === null) return;

    const canvas = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - canvas.left - dragOffset.x;
    const newY = e.clientY - canvas.top - dragOffset.y;

    onUpdateBlock(draggedBlock, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDraggedBlock(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'triggers':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'conditions':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'actions':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const renderBlockConfig = (block: Block) => {
    if (editingBlock !== block.id) return null;

    return (
      <div className="absolute top-full left-0 mt-2 p-3 bg-white border rounded-lg shadow-lg z-10 min-w-64">
        <h4 className="font-medium mb-2">Configure Block</h4>
        {renderConfigFields(block)}
        <div className="flex space-x-2 mt-3">
          <Button size="sm" onClick={() => setEditingBlock(null)}>Done</Button>
        </div>
      </div>
    );
  };

  const renderConfigFields = (block: Block) => {
    switch (block.type) {
      case 'trigger':
        if (block.label.includes('email')) {
          return (
            <Select 
              value={block.config.emailType} 
              onValueChange={(value) => onUpdateBlock(block.id, { 
                config: { ...block.config, emailType: value } 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Email type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any email</SelectItem>
                <SelectItem value="invoice">Invoices only</SelectItem>
                <SelectItem value="customer">Customer emails</SelectItem>
                <SelectItem value="supplier">Supplier emails</SelectItem>
              </SelectContent>
            </Select>
          );
        }
        break;
      
      case 'condition':
        if (block.label.includes('amount')) {
          return (
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Amount"
                value={block.config.amount}
                onChange={(e) => onUpdateBlock(block.id, {
                  config: { ...block.config, amount: parseInt(e.target.value) }
                })}
              />
              <Select
                value={block.config.comparison}
                onValueChange={(value) => onUpdateBlock(block.id, {
                  config: { ...block.config, comparison: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater">Greater than</SelectItem>
                  <SelectItem value="less">Less than</SelectItem>
                  <SelectItem value="equal">Equal to</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }
        break;
      
      case 'action':
        if (block.label.includes('email')) {
          return (
            <div className="space-y-2">
              <Input
                placeholder="Recipient email"
                value={block.config.recipient}
                onChange={(e) => onUpdateBlock(block.id, {
                  config: { ...block.config, recipient: e.target.value }
                })}
              />
              <Select
                value={block.config.template}
                onValueChange={(value) => onUpdateBlock(block.id, {
                  config: { ...block.config, template: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default template</SelectItem>
                  <SelectItem value="urgent">Urgent notification</SelectItem>
                  <SelectItem value="reminder">Reminder template</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }
        break;
    }
    return <div className="text-sm text-gray-500">No configuration options</div>;
  };

  return (
    <div 
      className="relative w-full h-full bg-gray-50 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Blocks */}
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`absolute cursor-move select-none ${getCategoryColor(block.category)}`}
          style={{
            left: block.x,
            top: block.y,
            transform: draggedBlock === block.id ? 'scale(1.05)' : 'scale(1)',
            transition: draggedBlock === block.id ? 'none' : 'transform 0.2s'
          }}
          onMouseDown={(e) => handleMouseDown(e, block.id)}
        >
          <Card className="p-3 min-w-48 shadow-md border-2">
            <div className="flex items-center justify-between mb-2">
              <Badge 
                variant="secondary" 
                className={getCategoryColor(block.category)}
              >
                {block.category}
              </Badge>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => setEditingBlock(editingBlock === block.id ? null : block.id)}
                >
                  <Settings className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  onClick={() => onRemoveBlock(block.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="text-sm font-medium">{block.label}</div>
            {block.config && Object.keys(block.config).length > 0 && (
              <div className="text-xs text-gray-600 mt-1">
                {Object.entries(block.config).map(([key, value]) => (
                  <div key={key}>{key}: {String(value)}</div>
                ))}
              </div>
            )}
            {renderBlockConfig(block)}
          </Card>
        </div>
      ))}

      {/* Empty state */}
      {blocks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Move className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Start Building Your Rule</h3>
            <p className="text-sm">
              Drag blocks from the palette to create your automation rule
            </p>
          </div>
        </div>
      )}
    </div>
  );
}