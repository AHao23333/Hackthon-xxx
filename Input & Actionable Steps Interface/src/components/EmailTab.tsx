import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Mail, Calendar, DollarSign, Package, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockEmails = [
  {
    id: 1,
    from: 'Supplier ABC Ltd',
    subject: 'Invoice #INV-2024-0892',
    time: '2 hours ago',
    type: 'invoice',
    amount: '$2,450.00',
    dueDate: '14 days',
    preview: 'Thank you for your recent order. Please find attached invoice for...',
    priority: 'high'
  },
  {
    id: 2,
    from: 'customer@acmecorp.com',
    subject: 'Order Status Inquiry - #ORD-5523',
    time: '4 hours ago',
    type: 'customer_inquiry',
    orderNumber: '#ORD-5523',
    preview: 'Hi, I wanted to check on the status of my recent order placed...',
    priority: 'medium'
  },
  {
    id: 3,
    from: 'tech.supplies@globaltech.com',
    subject: 'Stock Update - Items Back in Stock',
    time: '1 day ago',
    type: 'supplier_update',
    itemsCount: 12,
    preview: 'Good news! The following items are now back in stock and ready...',
    priority: 'low'
  },
  {
    id: 4,
    from: 'payments@bankpro.com',
    subject: 'Payment Reminder - Invoice Due Tomorrow',
    time: '1 day ago',
    type: 'payment_reminder',
    amount: '$1,200.00',
    preview: 'This is a friendly reminder that your payment is due tomorrow...',
    priority: 'high'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'invoice':
      return <DollarSign className="h-4 w-4" />;
    case 'customer_inquiry':
      return <Mail className="h-4 w-4" />;
    case 'supplier_update':
      return <Package className="h-4 w-4" />;
    case 'payment_reminder':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Mail className="h-4 w-4" />;
  }
};

const getTypeBadge = (type: string) => {
  const badges = {
    invoice: { label: 'Invoice', variant: 'default' as const },
    customer_inquiry: { label: 'Customer', variant: 'secondary' as const },
    supplier_update: { label: 'Supplier', variant: 'outline' as const },
    payment_reminder: { label: 'Payment', variant: 'destructive' as const }
  };
  return badges[type] || { label: 'Email', variant: 'default' as const };
};

interface EmailTabProps {
  onSelectItem: (item: any) => void;
}

export function EmailTab({ onSelectItem }: EmailTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-gray-600" />
          <span className="font-medium">Email Inbox</span>
          <Badge variant="secondary">{mockEmails.length} unread</Badge>
        </div>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-3">
          {mockEmails.map((email) => {
            const badge = getTypeBadge(email.type);
            return (
              <Card 
                key={email.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectItem(email)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getTypeIcon(email.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm truncate">{email.from}</span>
                          <Badge variant={badge.variant} className="text-xs">
                            {badge.label}
                          </Badge>
                          {email.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">High</Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1 truncate">{email.subject}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{email.preview}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{email.time}</span>
                          {email.amount && (
                            <span className="font-medium text-green-600">{email.amount}</span>
                          )}
                          {email.dueDate && (
                            <span className="text-orange-600">Due in {email.dueDate}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}