import React, { useEffect } from 'react';
import { useNetworkStore } from './store/useNetworkStore';
import { Sidebar } from './components/shared/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { SpeedTest } from './components/speedtest/SpeedTest';
import { ServerList } from './components/servers/ServerList';
import { AIInsights } from './components/ai-insights/AIInsights';
import { Settings } from './components/settings/Settings';

const App: React.FC = () => {
  const { currentTab, updateRealtimeMetrics, isTesting } = useNetworkStore();

  // Simulate real-time background ping tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTesting) return; // Do not update real-time metrics during speed test
      
      const randomPing = 10 + Math.floor(Math.random() * 12);
      const randomJitter = Math.floor(Math.random() * 4);
      updateRealtimeMetrics(randomPing, randomJitter);
    }, 2000);

    return () => clearInterval(interval);
  }, [updateRealtimeMetrics, isTesting]);

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'speed-test':
        return <SpeedTest />;
      case 'servers':
        return <ServerList />;
      case 'ai-insights':
        return <AIInsights />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex w-screen h-screen bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-[#0b0f19] relative">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/3 blur-[100px] rounded-full pointer-events-none" />
        
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default App;
