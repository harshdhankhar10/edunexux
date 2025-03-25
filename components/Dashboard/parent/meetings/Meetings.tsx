
import React from 'react';
// import Layout from '@/components/layout/Layout';
import MeetingsList from '@/components/Dashboard/parent/meetings/MeetingsList';

const Meetings: React.FC = () => {
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Meetings</h1>
          <p className="text-gray-600">Schedule and manage meetings with teachers</p>
        </div>
        
        <MeetingsList />
      </div>
    </>
  );
};

export default Meetings;
