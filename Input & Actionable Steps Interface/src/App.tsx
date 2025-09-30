import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { InputInterface } from './components/InputInterface';
import { RulesBuilder } from './components/RulesBuilder';
import { Building2, Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('input');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900">SmartFlow - Your Business Agent</h1>
          </div>
          <div className="text-sm text-gray-500">
            Intelligent Business Automation Platform
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="input" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Input & Actions</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Agent Builder</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="mt-6">
            <InputInterface />
          </TabsContent>

          <TabsContent value="rules" className="mt-6">
            <RulesBuilder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}