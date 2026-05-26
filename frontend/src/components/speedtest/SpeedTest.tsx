import React from 'react';
import { useNetworkStore } from '../../store/useNetworkStore';
import { Play, RotateCcw, Zap, ArrowDown, ArrowUp, Wifi } from 'lucide-react';

export const SpeedTest: React.FC = () => {
  const { 
    isTesting, 
    testProgress, 
    testPhase, 
    downloadSpeed, 
    uploadSpeed, 
    currentPing,
    activeServer, 
    startSpeedTest 
  } = useNetworkStore();

  // Helper to determine what speed to render in the large central dial
  const getDisplaySpeed = () => {
    if (testPhase === 'ping') return `${currentPing} ms`;
    if (testPhase === 'download') return `${downloadSpeed} Mbps`;
    if (testPhase === 'upload') return `${uploadSpeed} Mbps`;
    if (testPhase === 'complete') return `${downloadSpeed} Mbps`;
    return '0.00';
  };

  const getPhaseLabel = () => {
    switch (testPhase) {
      case 'ping': return 'Testing Latency (Ping)...';
      case 'download': return 'Measuring Download Bandwidth...';
      case 'upload': return 'Measuring Upload Bandwidth...';
      case 'complete': return 'Test Complete';
      default: return 'Ready to Test';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center space-y-8">
      {/* Central Dial Gauge */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Outer glowing track */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="#1e293b"
            strokeWidth="8"
            fill="transparent"
            className="transition-all duration-300"
          />
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke={testPhase === 'complete' ? '#10b981' : '#06b6d4'}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 140}
            strokeDashoffset={2 * Math.PI * 140 * (1 - testProgress / 100)}
            strokeLinecap="round"
            className="transition-all duration-100 ease-out"
          />
        </svg>

        {/* Central Card Info */}
        <div className="w-64 h-64 bg-[#0d1220]/80 border border-[#1e293b] rounded-full shadow-[0_0_50px_rgba(6,182,212,0.05)] flex flex-col items-center justify-center text-center p-6 z-10 backdrop-blur-md">
          {isTesting ? (
            <div className="p-2 bg-cyan-500/10 rounded-full animate-bounce mb-2">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
          ) : (
            <div className="p-2 bg-emerald-500/10 rounded-full mb-2">
              <Wifi className="w-5 h-5 text-emerald-400" />
            </div>
          )}
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{getPhaseLabel()}</span>
          <h2 className="text-4xl font-extrabold text-slate-100 tracking-tighter my-2 font-mono">
            {getDisplaySpeed()}
          </h2>
          <span className="text-[10px] text-slate-400 font-mono">
            {activeServer ? activeServer.name : 'Unknown Host'}
          </span>
          {isTesting && (
            <span className="text-xs font-bold text-cyan-400 mt-2 font-mono">
              {testProgress}%
            </span>
          )}
        </div>
      </div>

      {/* Speed Metrics Summary */}
      <div className="w-full max-w-2xl grid grid-cols-3 gap-6">
        {/* Latency metric */}
        <div className="bg-[#0d1220]/50 border border-[#1e293b] rounded-2xl p-5 flex flex-col items-center text-center">
          <span className="text-xs font-medium text-slate-500 uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> Latency
          </span>
          <span className="text-2xl font-bold tracking-tight text-cyan-400 font-mono mt-1">
            {currentPing} <span className="text-xs text-slate-500 font-sans">ms</span>
          </span>
        </div>

        {/* Download metric */}
        <div className="bg-[#0d1220]/50 border border-[#1e293b] rounded-2xl p-5 flex flex-col items-center text-center">
          <span className="text-xs font-medium text-slate-500 uppercase flex items-center gap-1.5">
            <ArrowDown className="w-3.5 h-3.5 text-purple-400" /> Download
          </span>
          <span className="text-2xl font-bold tracking-tight text-purple-400 font-mono mt-1">
            {downloadSpeed} <span className="text-xs text-slate-500 font-sans">Mbps</span>
          </span>
        </div>

        {/* Upload metric */}
        <div className="bg-[#0d1220]/50 border border-[#1e293b] rounded-2xl p-5 flex flex-col items-center text-center">
          <span className="text-xs font-medium text-slate-500 uppercase flex items-center gap-1.5">
            <ArrowUp className="w-3.5 h-3.5 text-emerald-400" /> Upload
          </span>
          <span className="text-2xl font-bold tracking-tight text-emerald-400 font-mono mt-1">
            {uploadSpeed} <span className="text-xs text-slate-500 font-sans">Mbps</span>
          </span>
        </div>
      </div>

      {/* Start Speed Test Trigger */}
      <div>
        <button
          onClick={startSpeedTest}
          disabled={isTesting}
          className={`px-8 py-4 rounded-full font-bold text-sm flex items-center gap-3 transition-all duration-300 ${
            isTesting
              ? 'bg-[#1e293b] text-slate-500 cursor-not-allowed border border-transparent'
              : testPhase === 'complete'
              ? 'bg-emerald-500 hover:bg-emerald-600 text-[#0b0f19] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] shadow-lg'
              : 'bg-cyan-500 hover:bg-cyan-600 text-[#0b0f19] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] shadow-lg'
          }`}
        >
          {isTesting ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-slate-500 border-t-slate-300 animate-spin" />
              Running diagnostics
            </>
          ) : testPhase === 'complete' ? (
            <>
              <RotateCcw className="w-4 h-4 text-[#0b0f19]" />
              Run test again
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-[#0b0f19] fill-current" />
              Start manual speed test
            </>
          )}
        </button>
      </div>
    </div>
  );
};
