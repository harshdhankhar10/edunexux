
import React from 'react';
// import Layout from '@/components/layout/Layout';

const UpcomingMeetings: React.FC = () => {
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Meetings</h1>
          <p className="text-gray-600">View your scheduled meetings</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-700">Upcoming meetings will be displayed here.</p>
        </div>
      </div>
    </>
  );
};

export default UpcomingMeetings;
