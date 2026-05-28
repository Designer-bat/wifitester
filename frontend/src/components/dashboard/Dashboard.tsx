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
  Activity,
  Wifi
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
        return { label: 'Optimal', color: 'text-status-success', bg: 'bg-status-success/10', border: 'border-status-success/30', glow: 'shadow-sm hover:shadow-md' };
      case 'unstable':
        return { label: 'Jittery', color: 'text-status-warning', bg: 'bg-status-warning/10', border: 'border-status-warning/30', glow: 'shadow-sm hover:shadow-md' };
      case 'critical':
        return { label: 'Poor', color: 'text-status-error', bg: 'bg-status-error/10', border: 'border-status-error/30', glow: 'shadow-sm hover:shadow-md' };
      case 'optimizing':
        return { label: 'Optimizing...', color: 'text-primary-purple', bg: 'bg-primary-lavender', border: 'border-primary-gradient', glow: 'shadow-sm hover:shadow-md' };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      {/* Top Banner Status */}
      <div className={`p-6 rounded-2xl bg-background-card border ${statusConfig.border} ${statusConfig.glow} flex items-center justify-between shadow-sm transition-all duration-500`}>
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Connection Status</span>
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.color} border border-transparent`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current ${connectionStatus === 'optimizing' ? 'animate-spin' : 'animate-pulse'}`} />
              {statusConfig.label}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {activeServer ? `Connected to ${activeServer.name}` : 'Scanning Optimal Routes...'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Active Mode</span>
            <span className="text-sm font-semibold text-primary-purple uppercase tracking-wider font-mono">{optimizationMode} Mode</span>
          </div>
          <div className="p-3 bg-primary-lavender border border-primary-gradient rounded-xl">
            <Zap className="w-6 h-6 text-primary-purple" />
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latency Card */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-primary-gradient hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase">Ping Latency</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-primary-purple font-mono">{currentPing}</span>
                <span className="text-sm font-semibold text-slate-500">ms</span>
              </div>
            </div>
            <div className="p-3 bg-primary-lavender rounded-xl">
              <TrendingDown className="w-5 h-5 text-primary-purple" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
            <span className="text-status-success font-semibold flex items-center gap-0.5">
              <Zap className="w-3.5 h-3.5" /> Stable
            </span>
            <span>Jitter: ~2ms</span>
          </div>
        </div>

        {/* Download Speed Card */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-primary-gradient hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase">Download Speed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-primary-purple font-mono">{downloadSpeed}</span>
                <span className="text-sm font-semibold text-slate-500">Mbps</span>
              </div>
            </div>
            <div className="p-3 bg-primary-lavender rounded-xl">
              <ArrowDownRight className="w-5 h-5 text-primary-purple" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
            <span className="text-primary-purple font-semibold">100% capacity</span>
            <span>Buffered: 0ms</span>
          </div>
        </div>

        {/* Upload Speed Card */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-primary-gradient hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase">Upload Speed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-primary-purple font-mono">{uploadSpeed}</span>
                <span className="text-sm font-semibold text-slate-500">Mbps</span>
              </div>
            </div>
            <div className="p-3 bg-primary-lavender rounded-xl">
              <ArrowUpRight className="w-5 h-5 text-primary-purple" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
            <span className="text-status-success font-semibold">Broadcasting</span>
            <span>Stable upload link</span>
          </div>
        </div>
      </div>

      {/* Latency History Chart */}
      <div className="bg-background-card border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-slate-900">Real-time Latency Monitor</h3>
            <p className="text-xs text-slate-500">Live ping trend over the last 30 seconds</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <Activity className="w-4 h-4 text-primary-purple" />
            <span className="text-slate-600 font-medium">Auto-updating (2s)</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7B2CBF" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#7B2CBF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#cbd5e1"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#cbd5e1"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#e2e8f0', borderRadius: '12px' }}
                labelStyle={{ color: '#64748b', fontSize: '11px', fontWeight: 'bold' }}
                itemStyle={{ color: '#7B2CBF', fontSize: '13px', fontFamily: 'monospace' }}
              />
              <Area
                type="monotone"
                dataKey="ping"
                name="Latency (ms)"
                stroke="#7B2CBF"
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
        <div className="bg-background-card border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary-purple" />
            AI Decision Insights
          </h3>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-status-success/10 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-status-success" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">99.8% Route Confidence</h4>
                <p className="text-xs text-slate-600">Current routing displays zero packet loss and low jitter spikes.</p>
              </div>
            </div>

            <hr className="border-slate-200" />

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Prediction Matrix</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background-light p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-600 font-medium block">Peak Traffic Risk</span>
                  <span className="text-xs font-semibold text-status-success font-mono">LOW (12%)</span>
                </div>
                <div className="bg-background-light p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-600 font-medium block">Best Alternative</span>
                  <span className="text-xs font-semibold text-slate-800 truncate block">Cloudflare NY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Switch History Logs */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-purple" />
              Recent Optimization Activity
            </h3>

            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {switchHistory.length === 0 ? (
                <div className="text-center py-6 text-sm text-slate-500">
                  No automated switch logs yet.
                </div>
              ) : (
                switchHistory.map((event, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-mono">{event.timestamp}</span>
                      <p className="text-slate-700 font-medium">
                        Switched to <span className="text-slate-900 font-semibold">{event.toServer}</span>
                      </p>
                      <span className="text-slate-600 text-[10px] block italic">{event.reason}</span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="bg-status-success/10 border border-status-success/30 text-status-success px-2 py-0.5 rounded text-[10px] font-semibold font-mono">
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

