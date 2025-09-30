import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Upload, FileText, Image, Receipt, Package, File } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockUploads = [
  {
    id: 1,
    name: 'Receipt_Office_Supplies_Sept24.pdf',
    type: 'receipt',
    size: '2.4 MB',
    uploaded: '1 hour ago',
    status: 'processed',
    extractedData: {
      vendor: 'Office Depot',
      amount: '$147.50',
      date: '2024-09-28',
      category: 'Office Supplies'
    }
  },
  {
    id: 2,
    name: 'Inventory_Photo_Warehouse.jpg',
    type: 'inventory',
    size: '1.8 MB',
    uploaded: '3 hours ago',
    status: 'processing',
    extractedData: {
      items: 24,
      location: 'Warehouse A',
      lowStock: 3
    }
  },
  {
    id: 3,
    name: 'Contract_Supplier_XYZ.pdf',
    type: 'contract',
    size: '456 KB',
    uploaded: '1 day ago',
    status: 'processed',
    extractedData: {
      supplier: 'XYZ Manufacturing',
      terms: '30 days',
      value: '$12,000'
    }
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'receipt':
      return <Receipt className="h-5 w-5" />;
    case 'inventory':
      return <Package className="h-5 w-5" />;
    case 'contract':
      return <FileText className="h-5 w-5" />;
    case 'image':
      return <Image className="h-5 w-5" />;
    default:
      return <File className="h-5 w-5" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processed':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface UploadTabProps {
  onSelectItem: (item: any) => void;
}

export function UploadTab({ onSelectItem }: UploadTabProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your files here, or click to browse
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-4">
            <p>✓ Invoices & Receipts (PDF, JPG, PNG)</p>
            <p>✓ Inventory Photos</p>
            <p>✓ Contracts & Documents</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Choose Files
          </Button>
        </CardContent>
      </Card>

      {/* Recent Uploads */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Recent Uploads</h3>
          <Badge variant="secondary">{mockUploads.length} files</Badge>
        </div>

        <ScrollArea className="h-[350px]">
          <div className="space-y-3">
            {mockUploads.map((upload) => (
              <Card 
                key={upload.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectItem(upload)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getFileIcon(upload.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">{upload.name}</h4>
                        <Badge 
                          className={`text-xs ${getStatusColor(upload.status)}`}
                          variant="secondary"
                        >
                          {upload.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                        <span>{upload.size}</span>
                        <span>•</span>
                        <span>{upload.uploaded}</span>
                      </div>
                      {upload.extractedData && (
                        <div className="text-xs text-gray-600">
                          {upload.type === 'receipt' && (
                            <span>{upload.extractedData.vendor} - {upload.extractedData.amount}</span>
                          )}
                          {upload.type === 'inventory' && (
                            <span>{upload.extractedData.items} items, {upload.extractedData.lowStock} low stock</span>
                          )}
                          {upload.type === 'contract' && (
                            <span>{upload.extractedData.supplier} - {upload.extractedData.value}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}