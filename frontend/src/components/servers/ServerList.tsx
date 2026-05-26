import React from 'react';
import { useNetworkStore, type Server } from '../../store/useNetworkStore';
import { ShieldCheck, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';

export const ServerList: React.FC = () => {
  const { servers, activeServer, selectServer } = useNetworkStore();

  const getStabilityIcon = (stability: number) => {
    if (stability >= 95) return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
    if (stability >= 90) return <CheckCircle2 className="w-4 h-4 text-cyan-400" />;
    return <AlertTriangle className="w-4 h-4 text-amber-400" />;
  };

  const getLatencyColor = (ping: number) => {
    if (ping <= 20) return 'text-emerald-400';
    if (ping <= 50) return 'text-cyan-400';
    if (ping <= 100) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-100">Global DNS & Speed Servers</h2>
          <p className="text-xs text-slate-500">Select a server to force route optimization or view diagnostics</p>
        </div>
        <div className="text-xs bg-[#0d1220]/50 border border-[#1e293b] px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-slate-400">Total servers: {servers.length}</span>
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
              className={`bg-[#0d1220]/50 border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-300 relative group ${
                isActive
                  ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.08)] bg-[#0d1220]/80'
                  : 'border-[#1e293b] hover:border-cyan-500/20'
              }`}
            >
              {/* Badges */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                {isRec && (
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                    AI Choice
                  </span>
                )}
                {isActive && (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                    Active
                  </span>
                )}
              </div>

              {/* Title & Host info */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors pr-20">
                  {server.name}
                </h3>
                <span className="text-[10px] text-slate-500 font-mono block truncate max-w-[200px]">
                  {server.host}
                </span>
              </div>

              {/* Core metrics */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#1e293b]/40">
                <div className="text-center">
                  <span className="text-[9px] text-slate-500 uppercase font-medium block">Ping</span>
                  <span className={`text-base font-bold font-mono ${getLatencyColor(server.ping)}`}>
                    {server.ping}ms
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] text-slate-500 uppercase font-medium block flex items-center justify-center gap-0.5">
                    Stability
                  </span>
                  <span className="text-base font-bold font-mono text-slate-300 flex items-center justify-center gap-1">
                    {getStabilityIcon(server.stability)}
                    {server.stability}%
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] text-slate-500 uppercase font-medium block">Download</span>
                  <span className="text-xs font-bold font-mono text-purple-400 block mt-1 truncate">
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
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 cursor-default'
                      : 'bg-[#1a2235] hover:bg-cyan-500 hover:text-[#0b0f19] text-slate-300 border border-transparent hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
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
