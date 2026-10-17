import React, { useState } from 'react';
import { Camera, Mic, Monitor, ShieldCheck, Check, AlertCircle, X } from 'lucide-react';
import { ProctoringService } from '../../services/proctoringService';

interface PermissionSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (stream: MediaStream) => void;
  assessmentTitle: string;
}

export const PermissionSetupModal: React.FC<PermissionSetupModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  assessmentTitle
}) => {
  const [testingMedia, setTestingMedia] = useState<boolean>(false);
  const [mediaGranted, setMediaGranted] = useState<boolean>(false);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTestHardware = async () => {
    setTestingMedia(true);
    setErrorMsg(null);
    const res = await ProctoringService.requestMediaPermissions();
    setTestingMedia(false);

    if (res.video && res.audio && res.stream) {
      setMediaGranted(true);
      setActiveStream(res.stream);
    } else {
      setErrorMsg(res.error || 'Camera/mic authorization failed.');
    }
  };

  const handleStartExam = () => {
    if (activeStream) {
      onSuccess(activeStream);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-xl bg-surface-low border border-border-prominent shadow-2xl p-6 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subdued">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-mastery-emerald" />
            <h3 className="font-semibold text-base text-white">Proctored Assessment Setup</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-surface-mid text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 text-xs">
          <div>
            <span className="text-[11px] font-mono-code text-slate-500 uppercase tracking-wider block">Target Assessment</span>
            <span className="text-sm font-semibold text-slate-200 block">{assessmentTitle}</span>
          </div>

          <div className="space-y-2 p-3.5 rounded-lg bg-surface-mid border border-border-subdued">
            <div className="font-semibold text-white mb-1">Pre-Assessment Integrity Checklist:</div>
            <div className="flex items-center gap-2 text-slate-300">
              <Camera className="w-4 h-4 text-neural shrink-0" />
              <span>Continuous live webcam presence verification</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mic className="w-4 h-4 text-mastery-teal shrink-0" />
              <span>Ambient audio integrity check during assessment duration</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Monitor className="w-4 h-4 text-mastery-emerald shrink-0" />
              <span>Fullscreen workspace enforcement (Tab-switches logged)</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-diagnostic-rose/10 border border-diagnostic-rose/30 text-diagnostic-rose flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {mediaGranted && (
            <div className="p-3 rounded-lg bg-mastery-emerald/10 border border-mastery-emerald/30 text-mastery-emerald flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span className="font-semibold">Hardware devices verified successfully. Ready to proceed.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subdued">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-md bg-surface-mid hover:bg-surface-elevated font-mono-code text-xs text-slate-300 border border-border-subdued transition-colors"
          >
            Cancel
          </button>
          {!mediaGranted ? (
            <button
              onClick={handleTestHardware}
              disabled={testingMedia}
              className="px-4 py-2 rounded-md bg-neural hover:bg-neural-deep font-mono-code text-xs font-semibold text-white shadow-md shadow-neural/20 transition-all disabled:opacity-50"
            >
              {testingMedia ? 'Checking Devices...' : 'Verify Camera & Mic'}
            </button>
          ) : (
            <button
              onClick={handleStartExam}
              className="px-5 py-2 rounded-md bg-mastery-emerald hover:bg-emerald-600 font-mono-code text-xs font-bold text-black shadow-lg shadow-mastery-emerald/25 transition-all"
            >
              Enter Fullscreen & Begin Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
