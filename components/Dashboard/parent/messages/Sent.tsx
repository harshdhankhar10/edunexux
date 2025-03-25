
import React from 'react';
// import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '@/components/ui/avatar';

// Mock sent messages (since our mock data only has received messages)
const sentMessages = [
  {
    id: 's1',
    recipient: {
      id: 't1',
      name: 'Mrs. Smith',
      role: 'teacher',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    content: "Thank you for your feedback on Alex's math test. We'll continue to encourage his studies at home.",
    timestamp: '2023-09-13T09:30:00Z',
  },
  {
    id: 's2',
    recipient: {
      id: 't2',
      name: 'Mr. Johnson',
      role: 'teacher',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    content: "Alex will bring the science project materials tomorrow. Is there anything specific he should prepare in advance?",
    timestamp: '2023-09-12T15:45:00Z',
  },
  {
    id: 's3',
    recipient: {
      id: 'a1',
      name: 'Principal Davis',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    content: "We're available for the parent-teacher conference next Friday at 4:00 PM. Looking forward to discussing Alex's progress.",
    timestamp: '2023-09-11T11:20:00Z',
  }
];

const Sent: React.FC = () => {
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sent Messages</h1>
          <p className="text-gray-600">Track messages you've sent</p>
        </div>
        
        <div className="space-y-4">
          {sentMessages.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">No sent messages</p>
              </CardContent>
            </Card>
          ) : (
            sentMessages.map((message) => (
              <Card key={message.id} className="transition-all hover:shadow-md">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {message.recipient.avatar ? (
                          <img 
                            src={message.recipient.avatar} 
                            alt={message.recipient.name} 
                            className="aspect-square h-full w-full"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                            {message.recipient.name.charAt(0)}
                          </div>
                        )}
                      </Avatar>
                      <div>
                        <CardTitle className="text-base font-semibold">
                          To: {message.recipient.name}
                        </CardTitle>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium px-2 py-1 rounded-full bg-gray-100">
                      {message.recipient.role}
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

export default Sent;
