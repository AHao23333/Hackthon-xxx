import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Mic, Play, Pause, Upload, Clock, CheckCircle } from 'lucide-react';

const mockVoiceNotes = [
  {
    id: 1,
    title: 'Call with Supplier ABC about delivery delays',
    duration: '2:34',
    recorded: '30 minutes ago',
    status: 'transcribed',
    transcript: 'Spoke with John from ABC about the delayed shipment of office chairs. They confirmed delivery will be pushed to next Tuesday due to logistics issues...',
    actionItems: [
      'Update customer about delivery delay',
      'Offer 10% discount for inconvenience',
      'Schedule follow-up call for Tuesday'
    ]
  },
  {
    id: 2,
    title: 'Product idea - Smart inventory tracker',
    duration: '1:45',
    recorded: '2 hours ago',
    status: 'processing',
    transcript: 'Had an idea for a smart inventory tracking system that uses QR codes and mobile scanning...',
    actionItems: []
  },
  {
    id: 3,
    title: 'Meeting notes - Q4 planning session',
    duration: '5:12',
    recorded: '1 day ago',
    status: 'transcribed',
    transcript: 'Discussed Q4 goals with the team. Main focus areas include expanding product line, improving customer service response times...',
    actionItems: [
      'Research new product suppliers',
      'Hire additional customer service rep',
      'Set up customer feedback system'
    ]
  }
];

interface VoiceTabProps {
  onSelectItem: (item: any) => void;
}

export function VoiceTab({ onSelectItem }: VoiceTabProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording timer simulation
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        setIsRecording(false);
        setRecordingTime(0);
      }, 5000); // Auto-stop after 5 seconds for demo
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Recording Section */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className={`relative p-6 rounded-full ${isRecording ? 'bg-red-100' : 'bg-gray-100'}`}>
                <Mic className={`h-8 w-8 ${isRecording ? 'text-red-600' : 'text-gray-600'}`} />
                {isRecording && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">
                {isRecording ? 'Recording...' : 'Record Voice Note'}
              </h3>
              {isRecording && (
                <p className="text-sm text-gray-600">
                  {formatTime(recordingTime)}
                </p>
              )}
              <p className="text-sm text-gray-500">
                {isRecording 
                  ? 'Speak clearly about your business tasks, ideas, or notes'
                  : 'Tap to start recording voice notes, meeting summaries, or quick ideas'
                }
              </p>
            </div>

            <div className="flex justify-center space-x-3">
              <Button 
                onClick={toggleRecording}
                variant={isRecording ? 'destructive' : 'default'}
                className="flex items-center space-x-2"
              >
                <Mic className="h-4 w-4" />
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </Button>
              
              <Button variant="outline" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Audio</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Voice Notes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Recent Voice Notes</h3>
          <Badge variant="secondary">{mockVoiceNotes.length} recordings</Badge>
        </div>

        <ScrollArea className="h-[350px]">
          <div className="space-y-3">
            {mockVoiceNotes.map((note) => (
              <Card 
                key={note.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectItem(note)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Mic className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">{note.title}</h4>
                        <div className="flex items-center space-x-2">
                          {note.status === 'transcribed' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-orange-500" />
                          )}
                          <Badge 
                            variant={note.status === 'transcribed' ? 'secondary' : 'default'}
                            className="text-xs"
                          >
                            {note.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                        <span>{note.duration}</span>
                        <span>•</span>
                        <span>{note.recorded}</span>
                      </div>
                      
                      {note.transcript && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {note.transcript}
                        </p>
                      )}
                      
                      {note.actionItems.length > 0 && (
                        <div className="text-xs text-blue-600">
                          {note.actionItems.length} action items identified
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