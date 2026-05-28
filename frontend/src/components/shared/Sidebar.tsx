import React from 'react';
import { useNetworkStore } from '../../store/useNetworkStore';
import { LayoutDashboard, Activity, Server, BrainCircuit, Settings, Wifi } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentTab, setTab, connectionStatus } = useNetworkStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'speed-test', label: 'Speed Test', icon: Activity },
    { id: 'servers', label: 'Servers', icon: Server },
    { id: 'ai-insights', label: 'AI Insights', icon: BrainCircuit },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-background-card border-r border-slate-200 flex flex-col justify-between shrink-0 p-6 shadow-sm">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 bg-primary-lavender border border-primary-gradient rounded-xl relative">
            <Wifi className="w-6 h-6 text-primary-purple animate-pulse" />
            <div className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
              connectionStatus === 'stable' ? 'bg-status-success' :
              connectionStatus === 'unstable' ? 'bg-status-warning' :
              connectionStatus === 'critical' ? 'bg-status-error' : 'bg-primary-purple'
            }`} />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wider text-slate-800 uppercase">WiFi Optimizer</h1>
            <p className="text-xs text-slate-500 font-medium">Windows AI Engine</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-lavender border border-primary-gradient text-primary-purple shadow-sm hover:shadow-md'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-primary-purple' : 'text-slate-600'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-600 font-medium">Auto-Optimize</span>
          <span className="text-[10px] bg-status-success/10 text-status-success border border-status-success/30 px-2 py-0.5 rounded-full font-semibold uppercase">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-status-success animate-ping" />
          <span className="text-xs text-slate-700 font-medium font-mono">Service running</span>
        </div>
      </div>
    </aside>
  );
};
