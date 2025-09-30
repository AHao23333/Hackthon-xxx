import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { EmailTab } from './EmailTab';
import { UploadTab } from './UploadTab';
import { ChatTab } from './ChatTab';
import { VoiceTab } from './VoiceTab';
import { AIProcessingPane } from './AIProcessingPane';
import { Mail, Upload, MessageCircle, Mic } from 'lucide-react';

export function InputInterface() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="flex gap-6 h-[calc(100vh-200px)]">
      {/* Main Input Area */}
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="emails" className="h-full">
              <TabsList className="grid w-full grid-cols-4 px-6">
                <TabsTrigger value="emails" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Emails</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Images</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>SMS</span>
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center space-x-2">
                  <Mic className="h-4 w-4" />
                  <span>Voice</span>
                </TabsTrigger>
              </TabsList>

              <div className="px-6 pb-6">
                <TabsContent value="emails" className="mt-4">
                  <EmailTab onSelectItem={setSelectedItem} />
                </TabsContent>

                <TabsContent value="upload" className="mt-4">
                  <UploadTab onSelectItem={setSelectedItem} />
                </TabsContent>

                <TabsContent value="chat" className="mt-4">
                  <ChatTab onSelectItem={setSelectedItem} />
                </TabsContent>

                <TabsContent value="voice" className="mt-4">
                  <VoiceTab onSelectItem={setSelectedItem} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Pane */}
      <div className="w-96">
        <AIProcessingPane selectedItem={selectedItem} />
      </div>
    </div>
  );
}