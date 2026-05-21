import React from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div class="min-h-screen flex flex-col bg-slate-950">
      {/* Header Banner */}
      <header class="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <div class="h-4 w-4 rounded-full bg-cyan-500 animate-pulse"></div>
          <h1 class="text-xl font-bold tracking-wider text-slate-100">
            PHISH<span class="text-cyan-400">SHIELD</span> AI
          </h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-slate-400">
            Target Region: <strong class="text-slate-200">Global / Remote Operations</strong>
          </span>
          <span class="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
            Core Engine v2.0
          </span>
        </div>
      </header>

      {/* Main Workspace Dashboard */}
      <main class="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;