import React, { useState } from 'react';
import Analyzer from './Analyzer';

const Dashboard: React.FC = () => {
  const [simulationMode, setSimulationMode] = useState<'SAFE' | 'DEEPFAKE'>('SAFE');

  return (
    <div class="space-y-6">
      {/* Product Mission Context Box */}
      <div class="bg-gradient-to-r from-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-slate-800">
        <h2 class="text-lg font-semibold text-slate-200 mb-1">Deepfake & Audio Cloning Anti-Hijacking Enterprise Workspace</h2>
        <p class="text-sm text-slate-400 max-w-3xl">
          Mitigating cross-border synthetic identity theft. PhishShield AI hooks into your communications, monitoring real-time bio-frequency irregularities and spatial facial artifacts to prevent high-profile corporate phishing.
        </p>
        
        {/* Hackathon Live Control Board */}
        <div class="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-4">
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">Hackathon Demo Controls:</span>
          <div class="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setSimulationMode('SAFE')}
              class={`px-4 py-2 text-xs font-medium rounded-l-lg border ${
                simulationMode === 'SAFE'
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              Simulate Verified User
            </button>
            <button
              onClick={() => setSimulationMode('DEEPFAKE')}
              class={`px-4 py-2 text-xs font-medium rounded-r-lg border-y border-r ${
                simulationMode === 'DEEPFAKE'
                  ? 'bg-red-600 border-red-500 text-white animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              Inject Artificial Threat Vector
            </button>
          </div>
        </div>
      </div>

      {/* Execution Frame Component */}
      <Analyzer mode={simulationMode} />
    </div>
  );
};

export default Dashboard;