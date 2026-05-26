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
    <aside className="w-64 h-screen bg-[#0d1220]/90 border-r border-[#1e293b] flex flex-col justify-between shrink-0 p-6 backdrop-blur-md">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl relative">
            <Wifi className="w-6 h-6 text-cyan-400 animate-pulse" />
            <div className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full border border-[#0b0f19] ${
              connectionStatus === 'stable' ? 'bg-emerald-500' :
              connectionStatus === 'unstable' ? 'bg-amber-500' :
              connectionStatus === 'critical' ? 'bg-red-500' : 'bg-cyan-500'
            }`} />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">WiFi Optimizer</h1>
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
                    ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a2235]/50 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer */}
      <div className="bg-[#131b2e]/60 border border-[#1e293b]/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500 font-medium">Auto-Optimize</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold uppercase">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs text-slate-300 font-medium font-mono">Service running</span>
        </div>
      </div>
    </aside>
  );
};
