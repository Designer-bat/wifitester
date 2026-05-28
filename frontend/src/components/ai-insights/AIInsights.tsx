import React from 'react';
import { useNetworkStore } from '../../store/useNetworkStore';
import { BrainCircuit, Cpu, ShieldCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const AIInsights: React.FC = () => {
  const { pingHistory } = useNetworkStore();

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-primary-purple" />
          AI Neural Optimization Engines
        </h2>
        <p className="text-xs text-slate-600">View real-time predictions, packet trends, and local machine learning analytics</p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Model Prediction efficiency */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-600 uppercase block tracking-wider">Model Accuracy</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">98.4</span>
            <span className="text-xs text-slate-600">% confidence</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary-purple h-full rounded-full" style={{ width: '98%' }} />
          </div>
        </div>

        {/* Latency reduction efficiency */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-600 uppercase block tracking-wider">Jitter Control</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-status-success font-mono">&lt; 1.5</span>
            <span className="text-xs text-slate-600">ms variance</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-status-success h-full rounded-full" style={{ width: '92%' }} />
          </div>
        </div>

        {/* Auto switcher count */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-600 uppercase block tracking-wider">Optimization Cycles</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-primary-purple font-mono">14</span>
            <span className="text-xs text-slate-600">switches / 24h</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary-purple h-full rounded-full" style={{ width: '74%' }} />
          </div>
        </div>

        {/* Model type */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <span className="text-[10px] font-semibold text-slate-600 uppercase block tracking-wider">Active ML Model</span>
          <div className="flex items-center gap-2 mt-1">
            <Cpu className="w-5 h-5 text-primary-purple" />
            <span className="text-sm font-bold text-slate-900 truncate">RandomForestRegression</span>
          </div>
          <span className="text-[10px] text-slate-600 font-mono block">Inference latency: 42ms</span>
        </div>
      </div>

      {/* Model Graph comparison */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Real-time jitter trend */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-6 xl:col-span-2 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900">Packet Jitter Trend (24h Prediction)</h3>
              <p className="text-xs text-slate-600">Live forecasting of high latency periods based on historical models</p>
            </div>
            <span className="text-[10px] bg-primary-lavender text-primary-purple border border-primary-gradient px-2 py-0.5 rounded font-mono font-semibold uppercase">
              Model: Live LSTM
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="time" stroke="#cbd5e1" fontSize={9} tickLine={false} />
                <YAxis stroke="#cbd5e1" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#e2e8f0', borderRadius: '12px' }}
                  labelStyle={{ color: '#64748b', fontSize: '10px' }}
                  itemStyle={{ color: '#7B2CBF', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="jitter" name="Jitter (ms)" stroke="#7B2CBF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ping" name="Pred Ping (ms)" stroke="#9D4EDD" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI scoring explanation */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-purple" />
            Decision Score Matrix
          </h3>
          <p className="text-xs text-slate-600">
            Servers are ranked in real-time by a dynamic utility score combining multiple metrics based on the selected mode:
          </p>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Latency Optimization</span>
                <span className="text-primary-purple font-mono">40%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-purple h-full rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Connection Stability (Jitter)</span>
                <span className="text-primary-gradient font-mono">30%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-gradient h-full rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Download Throughput</span>
                <span className="text-status-success font-mono">20%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-status-success h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Upload Bandwidth</span>
                <span className="text-status-warning font-mono">10%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-status-warning h-full rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
