
import React from 'react';
// import Layout from '@/components/layout/Layout';

const ScheduleMeeting: React.FC = () => {
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule Meeting</h1>
          <p className="text-gray-600">Book new appointments with teachers</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-700">Meeting scheduling form will be displayed here.</p>
        </div>
      </div>
    </>
  );
};

export default ScheduleMeeting;
