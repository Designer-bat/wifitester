import React from 'react';
import { useNetworkStore, type NetworkMode } from '../../store/useNetworkStore';
import { Settings as SettingsIcon, Cpu, Sliders } from 'lucide-react';

export const Settings: React.FC = () => {
  const { optimizationMode, setMode, autoSwitch, toggleAutoSwitch } = useNetworkStore();

  const modes: { id: NetworkMode; label: string; desc: string }[] = [
    { id: 'auto', label: 'Smart Auto Mode', desc: 'Fully autonomous machine learning control. Automatically detects current usage and shifts priority.' },
    { id: 'gaming', label: 'Gaming Latency Mode', desc: 'Prioritizes lowest latency path, reduces packet jitter, and limits download buffering.' },
    { id: 'streaming', label: 'Streaming Bandwidth Mode', desc: 'Prioritizes maximum throughput stability, smooth buffering, and high bandwidth caches.' },
    { id: 'work', label: 'Work Reliability Mode', desc: 'Prioritizes packet reliability and video conferencing stability over raw throughput speeds.' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-4xl">
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-primary-purple" />
          System Settings & Profiles
        </h2>
        <p className="text-xs text-slate-600">Configure optimization profiles, automation parameters, and notification alerts</p>
      </div>

      {/* Optimization profiles */}
      <div className="bg-background-card border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary-purple" />
          Optimization Profiles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modes.map((mode) => {
            const isActive = optimizationMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setMode(mode.id)}
                className={`p-5 rounded-xl border text-left flex flex-col justify-between space-y-3 transition-all duration-300 ${
                  isActive
                    ? 'border-primary-gradient bg-primary-lavender shadow-md'
                    : 'border-slate-200 hover:border-primary-gradient hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{mode.label}</span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary-purple' : 'bg-slate-300'}`} />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{mode.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Automation Parameters */}
      <div className="bg-background-card border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-primary-purple" />
          Automation Parameters
        </h3>

        <div className="space-y-4 divide-y divide-slate-200">
          {/* Toggle Auto Switch */}
          <div className="flex items-center justify-between py-1">
            <div className="space-y-0.5 pr-8">
              <span className="text-xs font-bold text-slate-900 block">Autonomous Server Switching</span>
              <p className="text-[11px] text-slate-600">
                Allow the AI neural recommendation engine to automatically switch windows adapters to the best route when degraded performance is detected.
              </p>
            </div>
            <button
              onClick={toggleAutoSwitch}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${
                autoSwitch ? 'bg-primary-purple' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  autoSwitch ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Slider for Trigger Threshold */}
          <div className="flex items-center justify-between py-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-900 block">Switching Jitter Threshold</span>
              <p className="text-[11px] text-slate-600">
                Force switch connections if jitter exceeds this millisecond threshold. Lower values mean faster switching but higher connection frequency.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="30"
                defaultValue="15"
                className="w-32 accent-primary-purple cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-800 min-w-[30px] text-right">15ms</span>
            </div>
          </div>

          {/* Test intervals */}
          <div className="flex items-center justify-between py-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-900 block">Periodic Diagnostic Interval</span>
              <p className="text-[11px] text-slate-600">
                Configure how often the background service conducts silent micro-pings to verify path latency integrity.
              </p>
            </div>
            <select className="bg-background-light border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:border-primary-purple focus:outline-none">
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
              <option value="600">10 minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
