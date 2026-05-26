import { create } from 'zustand';

export interface Server {
  id: string;
  name: string;
  host: string;
  ping: number;
  stability: number; // 0 to 100
  downloadSpeed: number; // Mbps
  uploadSpeed: number; // Mbps
  isRecommended: boolean;
}

export interface SwitchEvent {
  timestamp: string;
  fromServer: string;
  toServer: string;
  reason: string;
  latencyImprovement: string;
}

export type NetworkMode = 'gaming' | 'streaming' | 'work' | 'auto';
export type ConnectionStatus = 'stable' | 'unstable' | 'critical' | 'optimizing';

interface NetworkState {
  currentTab: string;
  connectionStatus: ConnectionStatus;
  optimizationMode: NetworkMode;
  autoSwitch: boolean;
  currentPing: number;
  pingHistory: { time: string; ping: number; jitter: number }[];
  downloadSpeed: number;
  uploadSpeed: number;
  activeServer: Server | null;
  servers: Server[];
  switchHistory: SwitchEvent[];
  isTesting: boolean;
  testProgress: number; // 0 to 100
  testPhase: 'idle' | 'ping' | 'download' | 'upload' | 'complete';
  
  // Actions
  setTab: (tab: string) => void;
  setMode: (mode: NetworkMode) => void;
  toggleAutoSwitch: () => void;
  startSpeedTest: () => void;
  selectServer: (serverId: string) => void;
  triggerAutoSwitch: (toServerId: string, reason: string) => void;
  updateRealtimeMetrics: (ping: number, jitter: number) => void;
}

// Helper to generate initial servers
const initialServers: Server[] = [
  { id: '1', name: 'US East (Virginia) - AWS', host: 'speedtest.us-east-1.amazonaws.com', ping: 12, stability: 99, downloadSpeed: 382.4, uploadSpeed: 94.2, isRecommended: true },
  { id: '2', name: 'US East (New York) - Cloudflare', host: 'ny.speedtest.cloudflare.com', ping: 18, stability: 96, downloadSpeed: 312.1, uploadSpeed: 78.4, isRecommended: false },
  { id: '3', name: 'US West (Oregon) - AWS', host: 'speedtest.us-west-2.amazonaws.com', ping: 72, stability: 92, downloadSpeed: 154.2, uploadSpeed: 38.6, isRecommended: false },
  { id: '4', name: 'Europe West (Frankfurt) - AWS', host: 'speedtest.eu-central-1.amazonaws.com', ping: 110, stability: 88, downloadSpeed: 95.8, uploadSpeed: 21.3, isRecommended: false },
  { id: '5', name: 'Asia East (Tokyo) - AWS', host: 'speedtest.ap-northeast-1.amazonaws.com', ping: 182, stability: 85, downloadSpeed: 82.4, uploadSpeed: 18.2, isRecommended: false }
];

export const useNetworkStore = create<NetworkState>((set, get) => ({
  currentTab: 'dashboard',
  connectionStatus: 'stable',
  optimizationMode: 'auto',
  autoSwitch: true,
  currentPing: 15,
  pingHistory: Array.from({ length: 15 }, (_, i) => ({
    time: new Date(Date.now() - (15 - i) * 2000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    ping: 12 + Math.floor(Math.random() * 8),
    jitter: Math.floor(Math.random() * 3)
  })),
  downloadSpeed: 345.6,
  uploadSpeed: 84.1,
  activeServer: initialServers[0],
  servers: initialServers,
  switchHistory: [
    { timestamp: '12:45:10 PM', fromServer: 'US West (Oregon) - AWS', toServer: 'US East (Virginia) - AWS', reason: 'High Jitter detected (>12ms)', latencyImprovement: '72ms ➔ 12ms' },
    { timestamp: '11:30:05 AM', fromServer: 'US East (New York) - Cloudflare', toServer: 'US East (Virginia) - AWS', reason: 'Auto Mode periodic optimization', latencyImprovement: '18ms ➔ 12ms' }
  ],
  isTesting: false,
  testProgress: 0,
  testPhase: 'idle',

  setTab: (tab) => set({ currentTab: tab }),
  setMode: (mode) => set({ optimizationMode: mode }),
  toggleAutoSwitch: () => set((state) => ({ autoSwitch: !state.autoSwitch })),
  
  startSpeedTest: () => {
    if (get().isTesting) return;
    
    set({ isTesting: true, testProgress: 0, testPhase: 'ping' });
    
    // Simulate speed test phases
    const interval = setInterval(() => {
      const { testProgress, testPhase } = get();
      if (testProgress >= 100) {
        clearInterval(interval);
        set({ 
          isTesting: false, 
          testPhase: 'complete',
          connectionStatus: 'stable'
        });
        return;
      }
      
      const newProgress = testProgress + 2;
      let newPhase = testPhase;
      
      if (newProgress > 90) {
        newPhase = 'complete';
      } else if (newProgress > 50) {
        newPhase = 'upload';
      } else if (newProgress > 15) {
        newPhase = 'download';
      }
      
      // Simulate live random updates for the gauge
      const randDownload = newPhase === 'download' ? 200 + Math.random() * 200 : get().downloadSpeed;
      const randUpload = newPhase === 'upload' ? 40 + Math.random() * 60 : get().uploadSpeed;
      const randPing = newPhase === 'ping' ? 8 + Math.floor(Math.random() * 15) : get().currentPing;
      
      set({
        testProgress: newProgress,
        testPhase: newPhase,
        downloadSpeed: Number(randDownload.toFixed(1)),
        uploadSpeed: Number(randUpload.toFixed(1)),
        currentPing: randPing,
        connectionStatus: 'optimizing'
      });
    }, 100);
  },

  selectServer: (serverId) => {
    const server = get().servers.find(s => s.id === serverId) || null;
    if (server) {
      set({ 
        activeServer: server,
        currentPing: server.ping,
        downloadSpeed: server.downloadSpeed,
        uploadSpeed: server.uploadSpeed
      });
    }
  },

  triggerAutoSwitch: (toServerId, reason) => {
    const fromServer = get().activeServer?.name || 'Unknown';
    const toServerObj = get().servers.find(s => s.id === toServerId);
    if (!toServerObj) return;

    const newEvent: SwitchEvent = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      fromServer,
      toServer: toServerObj.name,
      reason,
      latencyImprovement: `${get().currentPing}ms ➔ ${toServerObj.ping}ms`
    };

    set((state) => ({
      activeServer: toServerObj,
      currentPing: toServerObj.ping,
      downloadSpeed: toServerObj.downloadSpeed,
      uploadSpeed: toServerObj.uploadSpeed,
      switchHistory: [newEvent, ...state.switchHistory],
      connectionStatus: 'stable'
    }));
  },

  updateRealtimeMetrics: (ping, jitter) => {
    set((state) => {
      const newHistory = [...state.pingHistory.slice(1), {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ping,
        jitter
      }];
      
      let status: ConnectionStatus = 'stable';
      if (ping > 120) status = 'critical';
      else if (ping > 75 || jitter > 10) status = 'unstable';
      
      return {
        currentPing: ping,
        pingHistory: newHistory,
        connectionStatus: state.isTesting ? 'optimizing' : status
      };
    });
  }
}));
