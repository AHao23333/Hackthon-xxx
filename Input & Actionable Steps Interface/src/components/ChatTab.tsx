import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const mockChats = [
  {
    id: 1,
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    message: 'Hi, I placed an order 3 days ago but haven\'t received tracking information yet. Order #1234',
    time: '5 minutes ago',
    status: 'new',
    priority: 'medium',
    orderNumber: '#1234',
    platform: 'Website Chat'
  },
  {
    id: 2,
    customer: 'Mike Chen',
    email: 'mike.chen@company.com',
    message: 'Do you have the wireless headphones in blue color? I need 5 units for my team.',
    time: '1 hour ago',
    status: 'responded',
    priority: 'low',
    platform: 'WhatsApp',
    estimatedValue: '$750'
  },
  {
    id: 3,
    customer: 'Lisa Rodriguez',
    email: 'lisa.r@startup.co',
    message: 'I received the wrong item. I ordered Model A but got Model B. Please help with exchange.',
    time: '2 hours ago',
    status: 'urgent',
    priority: 'high',
    orderNumber: '#5678',
    platform: 'Email'
  },
  {
    id: 4,
    customer: 'David Park',
    email: 'david.park@corp.com',
    message: 'Interested in bulk pricing for office furniture. Can we schedule a call to discuss?',
    time: '4 hours ago',
    status: 'new',
    priority: 'high',
    platform: 'Contact Form',
    estimatedValue: '$5000+'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'new':
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    case 'responded':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'urgent':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return { label: 'New', variant: 'default' as const };
    case 'responded':
      return { label: 'Responded', variant: 'secondary' as const };
    case 'urgent':
      return { label: 'Urgent', variant: 'destructive' as const };
    default:
      return { label: 'Pending', variant: 'outline' as const };
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'WhatsApp':
      return 'bg-green-100 text-green-800';
    case 'Website Chat':
      return 'bg-blue-100 text-blue-800';
    case 'Email':
      return 'bg-purple-100 text-purple-800';
    case 'Contact Form':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface ChatTabProps {
  onSelectItem: (item: any) => void;
}

export function ChatTab({ onSelectItem }: ChatTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-gray-600" />
          <span className="font-medium">Customer Messages</span>
          <Badge variant="secondary">{mockChats.filter(c => c.status === 'new' || c.status === 'urgent').length} pending</Badge>
        </div>
        <Button variant="outline" size="sm">
          Mark All Read
        </Button>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-3">
          {mockChats.map((chat) => {
            const statusBadge = getStatusBadge(chat.status);
            return (
              <Card 
                key={chat.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectItem(chat)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {chat.customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{chat.customer}</span>
                          {getStatusIcon(chat.status)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={statusBadge.variant} className="text-xs">
                            {statusBadge.label}
                          </Badge>
                          {chat.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">High</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs text-gray-500">{chat.email}</span>
                        <span className="text-xs">•</span>
                        <Badge className={`text-xs ${getPlatformColor(chat.platform)}`} variant="secondary">
                          {chat.platform}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{chat.message}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{chat.time}</span>
                        <div className="flex items-center space-x-2">
                          {chat.orderNumber && (
                            <span className="font-medium text-blue-600">{chat.orderNumber}</span>
                          )}
                          {chat.estimatedValue && (
                            <span className="font-medium text-green-600">{chat.estimatedValue}</span>
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