
import React from 'react';
// import Layout from '@/components/Dashboard/parent/Layout';

const Grades: React.FC = () => {
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grades</h1>
          <p className="text-gray-600">View detailed grade reports across all subjects</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-700">Grade details and reports will be displayed here.</p>
        </div>
      </div>
    </>
  );
};

export default Grades;
