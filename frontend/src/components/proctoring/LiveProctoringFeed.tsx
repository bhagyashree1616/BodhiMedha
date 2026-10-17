import React, { useEffect, useRef } from 'react';
import { Camera, Mic, ShieldAlert, Monitor, CheckCircle } from 'lucide-react';

interface LiveProctoringFeedProps {
  mediaStream: MediaStream | null;
  isFullscreen: boolean;
  warningsCount: number;
}

export const LiveProctoringFeed: React.FC<LiveProctoringFeedProps> = ({
  mediaStream,
  isFullscreen,
  warningsCount
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <div className="absolute bottom-4 left-4 z-40 w-60 rounded-xl bg-surface-low/95 border border-border-prominent shadow-2xl backdrop-blur-md overflow-hidden font-mono-code text-xs text-slate-200">
      {/* Feed Header */}
      <div className="px-3 py-1.5 bg-surface-mid/80 border-b border-border-subdued flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-mastery-emerald font-semibold">
          <span className="w-2 h-2 rounded-full bg-mastery-emerald animate-pulse"></span>
          <span>Live Proctoring</span>
        </div>
        <span className="text-[10px] text-slate-400">18ms latency</span>
      </div>

      {/* Video Container with Biometric Overlay */}
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
        {mediaStream ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
            {/* AI Biometric Face Bounding Box Overlay */}
            <div className="absolute inset-x-12 inset-y-4 border-2 border-dashed border-mastery-emerald/70 rounded-lg pointer-events-none flex flex-col justify-between p-1.5">
              <span className="text-[9px] font-semibold text-mastery-emerald bg-black/60 px-1 rounded self-start flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>Face Verified</span>
              </span>
              <span className="text-[8px] text-slate-300 bg-black/60 px-1 rounded self-end">
                1 Subject Visible
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center text-slate-500">
            <Camera className="w-6 h-6 mb-1 text-slate-600" />
            <span className="text-[10px]">Camera stream active</span>
          </div>
        )}
      </div>

      {/* Audio & Integrity Status Matrix */}
      <div className="p-2.5 space-y-2 bg-surface-low">
        {/* Audio Visualizer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Mic className="w-3 h-3 text-mastery-teal" />
            <span>Mic Active</span>
          </div>
          {/* Animated Audio Frequency Bar */}
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-2 rounded bg-mastery-emerald/60 animate-pulse"></span>
            <span className="w-1 h-3.5 rounded bg-mastery-emerald/80 animate-pulse"></span>
            <span className="w-1 h-1.5 rounded bg-mastery-emerald/40 animate-pulse"></span>
            <span className="w-1 h-4 rounded bg-mastery-emerald animate-pulse"></span>
            <span className="text-[9px] text-slate-400 pl-1">32 dB</span>
          </div>
        </div>

        {/* Browser State Grid */}
        <div className="pt-2 border-t border-border-subdued grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1 text-slate-300">
            <Monitor className="w-3 h-3 text-mastery-emerald" />
            <span>{isFullscreen ? 'Fullscreen: Active' : 'Fullscreen: Off'}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <ShieldAlert className={`w-3 h-3 ${warningsCount > 0 ? 'text-diagnostic-rose' : 'text-slate-400'}`} />
            <span>{warningsCount === 0 ? '0 Flags Logged' : `${warningsCount} Warnings`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
