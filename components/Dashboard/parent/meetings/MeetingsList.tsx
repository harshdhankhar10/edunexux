
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { messages } from '@/components/Dashboard/parent/data/mockData';
import { MoreHorizontal, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const MessagesList: React.FC = () => {
  return (
    <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communication with teachers and administrators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`p-4 rounded-lg ${!message.read ? 'bg-blue-50' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="mr-3">
                    {message.sender.avatar ? (
                      <img src={message.sender.avatar} alt={message.sender.name} className="h-10 w-10 rounded-full" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-500 font-semibold text-sm">
                          {message.sender.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{message.sender.name}</h4>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleDateString()} at {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Mark as {message.read ? 'unread' : 'read'}</DropdownMenuItem>
                            <DropdownMenuItem>Reply</DropdownMenuItem>
                            <DropdownMenuItem>Forward</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                      {message.sender.role === 'teacher' ? 'Teacher' : 'Administrator'}
                    </span>
                    <p className="text-sm text-gray-700 mt-2">{message.content}</p>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                        <Send className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Compose New Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesList;
