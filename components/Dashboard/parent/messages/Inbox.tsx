
import React from 'react';
// import Layout from '@/components/layout/Layout';
import { messages } from '@/components/Dashboard/parent/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '@/components/ui/avatar';

const Inbox: React.FC = () => {
  // Filter messages that are received (all messages in our mock data are received)
  const receivedMessages = messages;
  
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-600">View and manage received messages</p>
        </div>
        
        <div className="space-y-4">
          {receivedMessages.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">No messages in your inbox</p>
              </CardContent>
            </Card>
          ) : (
            receivedMessages.map((message) => (
              <Card key={message.id} className={`transition-all hover:shadow-md ${!message.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {message.sender.avatar ? (
                          <img 
                            src={message.sender.avatar} 
                            alt={message.sender.name} 
                            className="aspect-square h-full w-full"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                            {message.sender.name.charAt(0)}
                          </div>
                        )}
                      </Avatar>
                      <div>
                        <CardTitle className="text-base font-semibold">
                          {message.sender.name}
                        </CardTitle>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium px-2 py-1 rounded-full bg-gray-100">
                      {message.sender.role}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-700">{message.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Inbox;
