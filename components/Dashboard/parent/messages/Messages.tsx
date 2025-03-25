
import React from 'react';
// import Layout from '@/components/layout/Layout';
import MessagesList from '@/components/Dashboard/parent/messages/MessageList';

const Messages: React.FC = () => {
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with teachers and staff</p>
        </div>
        
        <MessagesList />
      </div>
    </>
  );
};

export default Messages;
