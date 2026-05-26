import React from 'react';
import { useNetworkStore } from '../../store/useNetworkStore';
import { 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Clock, 
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const Dashboard: React.FC = () => {
  const { 
    connectionStatus, 
    optimizationMode, 
    currentPing, 
    pingHistory, 
    downloadSpeed, 
    uploadSpeed, 
    activeServer,
    switchHistory
  } = useNetworkStore();

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'stable':
        return { label: 'Optimal', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]' };
      case 'unstable':
        return { label: 'Jittery', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]' };
      case 'critical':
        return { label: 'Poor', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.1)]' };
      case 'optimizing':
        return { label: 'Optimizing...', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]' };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      {/* Top Banner Status */}
      <div className={`p-6 rounded-2xl bg-[#0d1220]/80 border ${statusConfig.border} ${statusConfig.glow} flex items-center justify-between backdrop-blur-md transition-all duration-500`}>
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Connection Status</span>
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.color} border border-transparent`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current ${connectionStatus === 'optimizing' ? 'animate-spin' : 'animate-pulse'}`} />
              {statusConfig.label}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            {activeServer ? `Connected to ${activeServer.name}` : 'Scanning Optimal Routes...'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Active Mode</span>
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono">{optimizationMode} Mode</span>
          </div>
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latency Card */}
        <div className="bg-[#0d1220]/50 border border-[#1e293b] rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase">Ping Latency</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-cyan-400 font-mono">{currentPing}</span>
                <span className="text-sm font-semibold text-slate-400">ms</span>
              </div>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-xl">
              <TrendingDown className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <Zap className="w-3.5 h-3.5" /> Stable
            </span>
            <span>Jitter: ~2ms</span>
          </div>
        </div>

        {/* Download Speed Card */}
        <div className="bg-[#0d1220]/50 border border-[#1e293b] rounded-2xl p-6 relative overflow-hidden group hover:border-[#a855f7]/30 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase">Download Speed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-purple-400 font-mono">{downloadSpeed}</span>
                <span className="text-sm font-semibold text-slate-400">Mbps</span>
              </div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <ArrowDownRight className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-purple-400 font-semibold">100% capacity</span>
            <span>Buffered: 0ms</span>
          </div>
        </div>

        {/* Upload Speed Card */}
        <div className="bg-[#0d1220]/50 border border-[#1e293b] rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase">Upload Speed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-emerald-400 font-mono">{uploadSpeed}</span>
                <span className="text-sm font-semibold text-slate-400">Mbps</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">Broadcasting</span>
            <span>Stable upload link</span>
          </div>
        </div>
      </div>

      {/* Latency History Chart */}
      <div className="bg-[#0d1220]/30 border border-[#1e293b] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-slate-200">Real-time Latency Monitor</h3>
            <p className="text-xs text-slate-500">Live ping trend over the last 30 seconds</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-[#0d1220]/50 border border-[#1e293b] px-3 py-1.5 rounded-lg">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 font-medium">Auto-updating (2s)</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0d1220', borderColor: '#1e293b', borderRadius: '12px' }}
                labelStyle={{ color: '#94a3b8', fontSize: '11px', fontWeight: 'bold' }}
                itemStyle={{ color: '#06b6d4', fontSize: '13px', fontFamily: 'monospace' }}
              />
              <Area 
                type="monotone" 
                dataKey="ping" 
                name="Latency (ms)"
                stroke="#06b6d4" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPing)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Split layout: AI Insights & Switch Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommendation Engine Panel */}
        <div className="bg-[#0d1220]/50 border border-[#1e293b] rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            AI Decision Insights
          </h3>
          <div className="p-4 bg-[#111827]/40 border border-[#1e293b]/70 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">99.8% Route Confidence</h4>
                <p className="text-xs text-slate-500">Current routing displays zero packet loss and low jitter spikes.</p>
              </div>
            </div>

            <hr className="border-[#1e293b]/70" />

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Prediction Matrix</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0d1220]/50 p-2.5 rounded-lg border border-[#1e293b]/40">
                  <span className="text-[10px] text-slate-500 font-medium block">Peak Traffic Risk</span>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">LOW (12%)</span>
                </div>
                <div className="bg-[#0d1220]/50 p-2.5 rounded-lg border border-[#1e293b]/40">
                  <span className="text-[10px] text-slate-500 font-medium block">Best Alternative</span>
                  <span className="text-xs font-semibold text-slate-300 truncate block">Cloudflare NY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Switch History Logs */}
        <div className="bg-[#0d1220]/50 border border-[#1e293b] rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Recent Optimization Activity
            </h3>

            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {switchHistory.length === 0 ? (
                <div className="text-center py-6 text-sm text-slate-500">
                  No automated switch logs yet.
                </div>
              ) : (
                switchHistory.map((event, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border-b border-[#1e293b]/30 pb-3 last:border-b-0 last:pb-0">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-mono">{event.timestamp}</span>
                      <p className="text-slate-300 font-medium">
                        Switched to <span className="text-slate-200 font-semibold">{event.toServer}</span>
                      </p>
                      <span className="text-slate-500 text-[10px] block italic">{event.reason}</span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-semibold font-mono">
                        {event.latencyImprovement}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
