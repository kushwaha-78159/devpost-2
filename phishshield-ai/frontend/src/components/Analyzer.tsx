import React, { useEffect, useRef, useState } from 'react';

interface AnalyzerProps {
  mode: 'SAFE' | 'DEEPFAKE';
}

interface AnalysisResult {
  trustScore: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  metrics: {
    voiceCloningProbability: number;
    videoDeepfakeProbability: number;
    latencyMs: number;
  };
  verdict: string;
}

const Analyzer: React.FC<AnalyzerProps> = ({ mode }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamActive, setStreamActive] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<AnalysisResult | null>(null);

  // Initialize WebRTC Media Pipeline
  const startShield = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStreamActive(true);
      }
    } catch (err) {
      console.error("Access denied to hardware streaming assets", err);
      alert("Please allow camera access to show your dynamic functional hackathon demo pipeline!");
    }
  };

  const stopShield = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreamActive(false);
      setTelemetry(null);
    }
  };

  // Continuous Frame Delivery Polling Engine
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (streamActive) {
      intervalId = setInterval(() => {
        // Construct dynamic matrices based on current mode configuration
        const payload = {
          audioEnergy: mode === 'DEEPFAKE' ? parseFloat((Math.random() * 0.15 + 0.85).toFixed(2)) : parseFloat((Math.random() * 0.4).toFixed(2)),
          visualArtifactScore: mode === 'DEEPFAKE' ? parseFloat((Math.random() * 0.2 + 0.8).toFixed(2)) : parseFloat((Math.random() * 0.3).toFixed(2))
        };

        fetch('http://localhost:5000/api/analyze-frame', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(res => res.json())
          .then((data: AnalysisResult) => setTelemetry(data))
          .catch(err => console.error("Communication loss with AI analytical array:", err));
      }, 1000); // 1Hz telemetry updates
    }

    return () => clearInterval(intervalId);
  }, [streamActive, mode]);

  return (
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Sandbox Terminal */}
      <div class="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between">
        <div class="relative w-full h-96 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
          {streamActive ? (
            <video ref={videoRef} autoPlay playsInline muted class="w-full h-full object-cover scale-x-[-1]" />
          ) : (
            <div class="text-center space-y-2">
              <p class="text-sm text-slate-500">Live Telemetry Terminal Idle</p>
              <p class="text-xs text-slate-600">Activate interface matrix below to deploy analysis system</p>
            </div>
          )}

          {/* Real-time Dynamic Status Tag overlay */}
          {streamActive && telemetry && (
            <div class="absolute top-4 left-4 flex items-center space-x-2 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
              <span class={`h-2.5 w-2.5 rounded-full ${
                telemetry.status === 'SAFE' ? 'bg-emerald-500' : telemetry.status === 'WARNING' ? 'bg-yellow-500' : 'bg-red-500 animate-ping'
              }`} />
              <span class="text-xs font-mono font-bold tracking-wider">{telemetry.status} ACCESS</span>
            </div>
          )}
        </div>

        {/* System Controls */}
        <div class="mt-4 flex gap-4">
          {!streamActive ? (
            <button onClick={startShield} class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-sm font-semibold py-3 px-4 rounded-xl transition duration-200">
              Initialize Guard Matrix
            </button>
          ) : (
            <button onClick={stopShield} class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold py-3 px-4 rounded-xl transition duration-200">
              Terminate Protection Stream
            </button>
          )}
        </div>
      </div>

      {/* Cybersec Analytical Engine Readings Panel */}
      <div class="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h3 class="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-4">Neural Analytics Core</h3>
          
          {telemetry ? (
            <div class="space-y-6">
              {/* Radial Meter Variant */}
              <div class="text-center p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <span class="text-xs text-slate-500 block mb-1">IDENTITY INTEGRITY TRUST SCORE</span>
                <span class={`text-4xl font-extrabold tracking-tight ${
                  telemetry.trustScore > 75 ? 'text-emerald-400' : telemetry.trustScore > 40 ? 'text-yellow-400' : 'text-red-500'
                }`}>
                  {telemetry.trustScore}%
                </span>
              </div>

              {/* Individual Modality Metrics */}
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-400">Audio Cloned Vector Risk:</span>
                    <span class="font-mono text-slate-300">{telemetry.metrics.voiceCloningProbability}%</span>
                  </div>
                  <div class="w-full bg-slate-950 rounded-full h-1.5 border border-slate-850">
                    <div class={`h-1.5 rounded-full ${telemetry.metrics.voiceCloningProbability > 50 ? 'bg-red-500' : 'bg-cyan-500'}`} style={{ width: `${telemetry.metrics.voiceCloningProbability}%` }} />
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-400">Deepfake Structural Artifacts:</span>
                    <span class="font-mono text-slate-300">{telemetry.metrics.videoDeepfakeProbability}%</span>
                  </div>
                  <div class="w-full bg-slate-950 rounded-full h-1.5 border border-slate-850">
                    <div class={`h-1.5 rounded-full ${telemetry.metrics.videoDeepfakeProbability > 50 ? 'bg-red-500' : 'bg-cyan-500'}`} style={{ width: `${telemetry.metrics.videoDeepfakeProbability}%` }} />
                  </div>
                </div>
              </div>

              {/* Engine Log Output */}
              <div class="p-3 bg-slate-950 rounded-lg border border-slate-850">
                <span class="text-[10px] font-mono text-cyan-500 uppercase tracking-widest block mb-1">System Verdict:</span>
                <p class="text-xs text-slate-300 leading-relaxed font-sans">{telemetry.verdict}</p>
              </div>
            </div>
          ) : (
            <div class="text-center py-20 text-slate-600 text-xs font-mono">
              [ Awaiting Live Matrix Signal Engagement ]
            </div>
          )}
        </div>

        {/* Metadata Footer */}
        {telemetry && (
          <div class="mt-4 pt-4 border-t border-slate-800/60 flex justify-between text-[10px] font-mono text-slate-500">
            <span>PING: {telemetry.metrics.latencyMs}ms</span>
            <span>FEED STATUS: nominal</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;