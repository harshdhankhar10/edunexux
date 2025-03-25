
import React from 'react';
// import Header from '@/components/Header';
import WelcomeSection from '@/components/Dashboard/instructor/dashboard/WelcomeSection';
import StatsOverview from '@/components/Dashboard/instructor/dashboard/StatsOverview';
import TodaySchedule from '@/components/Dashboard/instructor/dashboard/TodaySchedule';
import CurrentClasses from '@/components/Dashboard/instructor/dashboard/CurrentClasses';
import AnalyticsSection from '@/components/Dashboard/instructor/dashboard/AnalyticsChart';
import ActivitySection from '@/components/Dashboard/instructor/dashboard/ActivitySection';
import WeeklySchedule from '@/components/Dashboard/instructor/dashboard/WeeklySchedule';


const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}
      
      <main className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <StatsOverview />
        <TodaySchedule />
        <CurrentClasses />
        <AnalyticsSection />
        <ActivitySection />
        <WeeklySchedule />
      </main>
    </div>
  );
};

export default Index;
