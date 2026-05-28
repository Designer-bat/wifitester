import React from 'react';
import { useNetworkStore, type Server } from '../../store/useNetworkStore';
import { ShieldCheck, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';

export const ServerList: React.FC = () => {
  const { servers, activeServer, selectServer } = useNetworkStore();

  const getStabilityIcon = (stability: number) => {
    if (stability >= 95) return <ShieldCheck className="w-4 h-4 text-status-success" />;
    if (stability >= 90) return <CheckCircle2 className="w-4 h-4 text-primary-purple" />;
    return <AlertTriangle className="w-4 h-4 text-status-warning" />;
  };

  const getLatencyColor = (ping: number) => {
    if (ping <= 20) return 'text-status-success';
    if (ping <= 50) return 'text-primary-purple';
    if (ping <= 100) return 'text-status-warning';
    return 'text-status-error';
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Global DNS & Speed Servers</h2>
          <p className="text-xs text-slate-600">Select a server to force route optimization or view diagnostics</p>
        </div>
        <div className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary-purple animate-pulse" />
          <span className="text-slate-700">Total servers: {servers.length}</span>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {servers.map((server: Server) => {
          const isActive = activeServer?.id === server.id;
          const isRec = server.isRecommended;

          return (
            <div
              key={server.id}
              className={`bg-background-card border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-300 relative group shadow-sm ${
                isActive
                  ? 'border-primary-gradient shadow-md'
                  : 'border-slate-200 hover:border-primary-gradient hover:shadow-md'
              }`}
            >
              {/* Badges */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                {isRec && (
                  <span className="text-[10px] bg-primary-lavender text-primary-purple border border-primary-gradient px-2 py-0.5 rounded-full font-bold uppercase">
                    AI Choice
                  </span>
                )}
                {isActive && (
                  <span className="text-[10px] bg-status-success/10 text-status-success border border-status-success/30 px-2 py-0.5 rounded-full font-bold uppercase">
                    Active
                  </span>
                )}
              </div>

              {/* Title & Host info */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-purple transition-colors pr-20">
                  {server.name}
                </h3>
                <span className="text-[10px] text-slate-600 font-mono block truncate max-w-[200px]">
                  {server.host}
                </span>
              </div>

              {/* Core metrics */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200">
                <div className="text-center">
                  <span className="text-[9px] text-slate-600 uppercase font-medium block">Ping</span>
                  <span className={`text-base font-bold font-mono ${getLatencyColor(server.ping)}`}>
                    {server.ping}ms
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] text-slate-600 uppercase font-medium block flex items-center justify-center gap-0.5">
                    Stability
                  </span>
                  <span className="text-base font-bold font-mono text-slate-800 flex items-center justify-center gap-1">
                    {getStabilityIcon(server.stability)}
                    {server.stability}%
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] text-slate-600 uppercase font-medium block">Download</span>
                  <span className="text-xs font-bold font-mono text-primary-purple block mt-1 truncate">
                    {server.downloadSpeed}M
                  </span>
                </div>
              </div>

              {/* Connect / Active Action */}
              <div>
                <button
                  disabled={isActive}
                  onClick={() => selectServer(server.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-lavender text-primary-purple border border-primary-gradient cursor-default'
                      : 'bg-slate-100 hover:bg-primary-lavender text-slate-800 hover:text-primary-purple border border-slate-200 hover:border-primary-gradient hover:shadow-md'
                  }`}
                >
                  {isActive ? 'Optimized Connection' : 'Route to Server'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
