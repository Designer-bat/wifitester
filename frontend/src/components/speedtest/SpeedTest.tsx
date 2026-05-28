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
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="transparent"
            className="transition-all duration-300"
          />
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke={testPhase === 'complete' ? '#22C55E' : '#7B2CBF'}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 140}
            strokeDashoffset={2 * Math.PI * 140 * (1 - testProgress / 100)}
            strokeLinecap="round"
            className="transition-all duration-100 ease-out"
          />
        </svg>

        {/* Central Card Info */}
        <div className="w-64 h-64 bg-background-card border border-slate-200 rounded-full shadow-lg flex flex-col items-center justify-center text-center p-6 z-10">
          {isTesting ? (
            <div className="p-2 bg-primary-lavender rounded-full animate-bounce mb-2">
              <Zap className="w-5 h-5 text-primary-purple" />
            </div>
          ) : (
            <div className="p-2 bg-primary-lavender rounded-full mb-2">
              <Wifi className="w-5 h-5 text-primary-purple" />
            </div>
          )}
          <span className="text-xs text-slate-600 font-semibold uppercase tracking-widest">{getPhaseLabel()}</span>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tighter my-2 font-mono">
            {getDisplaySpeed()}
          </h2>
          <span className="text-[10px] text-slate-600 font-mono">
            {activeServer ? activeServer.name : 'Unknown Host'}
          </span>
          {isTesting && (
            <span className="text-xs font-bold text-primary-purple mt-2 font-mono">
              {testProgress}%
            </span>
          )}
        </div>
      </div>

      {/* Speed Metrics Summary */}
      <div className="w-full max-w-2xl grid grid-cols-3 gap-6">
        {/* Latency metric */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
          <span className="text-xs font-medium text-slate-600 uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary-purple" /> Latency
          </span>
          <span className="text-2xl font-bold tracking-tight text-primary-purple font-mono mt-1">
            {currentPing} <span className="text-xs text-slate-500 font-sans">ms</span>
          </span>
        </div>

        {/* Download metric */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
          <span className="text-xs font-medium text-slate-600 uppercase flex items-center gap-1.5">
            <ArrowDown className="w-3.5 h-3.5 text-primary-purple" /> Download
          </span>
          <span className="text-2xl font-bold tracking-tight text-primary-purple font-mono mt-1">
            {downloadSpeed} <span className="text-xs text-slate-500 font-sans">Mbps</span>
          </span>
        </div>

        {/* Upload metric */}
        <div className="bg-background-card border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
          <span className="text-xs font-medium text-slate-600 uppercase flex items-center gap-1.5">
            <ArrowUp className="w-3.5 h-3.5 text-primary-purple" /> Upload
          </span>
          <span className="text-2xl font-bold tracking-tight text-primary-purple font-mono mt-1">
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
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-transparent'
              : testPhase === 'complete'
              ? 'bg-status-success hover:bg-status-success/90 text-white hover:shadow-lg shadow-md'
              : 'bg-gradient-to-r from-primary-purple to-primary-gradient hover:from-primary-gradient hover:to-primary-deep text-white hover:shadow-lg shadow-md'
          }`}
        >
          {isTesting ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-slate-600 animate-spin" />
              Running diagnostics
            </>
          ) : testPhase === 'complete' ? (
            <>
              <RotateCcw className="w-4 h-4" />
              Run test again
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Start manual speed test
            </>
          )}
        </button>
      </div>
    </div>
  );
};
