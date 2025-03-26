"use client";
import React from 'react';
import { useSession } from 'next-auth/react';

const WelcomeSection = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.firstName}!</h1>
      <p className="text-slate-600 mt-1">Here's what's happening with your classes today.</p>
    </div>
  );
};

export default WelcomeSection;
