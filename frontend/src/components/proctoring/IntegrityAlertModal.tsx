import React from 'react';
import { ProctoringIncident } from '../../types/assessment';
import { AlertTriangle, ShieldAlert, CheckCircle2, FileText } from 'lucide-react';

interface IntegrityAlertModalProps {
  incident: ProctoringIncident | null;
  onAcknowledge: () => void;
}

export const IntegrityAlertModal: React.FC<IntegrityAlertModalProps> = ({
  incident,
  onAcknowledge
}) => {
  if (!incident) return null;

  const isEscalated = incident.warningNumber >= 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-xl bg-surface-low border-2 border-diagnostic-rose shadow-2xl shadow-diagnostic-rose/20 p-5 text-slate-200">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-border-subdued text-diagnostic-rose">
          <div className="p-2 rounded-lg bg-diagnostic-rose/20 border border-diagnostic-rose/40">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider block text-diagnostic-rose">
              Integrity Incident Alert
            </span>
            <h3 className="font-bold text-base text-white">
              Warning {incident.warningNumber} of 3: {incident.type.replace('_', ' ')}
            </h3>
          </div>
        </div>

        {/* Body Content */}
        <div className="py-4 space-y-4">
          <div className="p-3.5 rounded-lg bg-diagnostic-rose/10 border border-diagnostic-rose/30 text-xs text-slate-200 leading-relaxed space-y-2">
            <p className="font-semibold text-diagnostic-rose">
              {incident.description}
            </p>
            <p className="text-slate-300">
              Under BodhiMedha policy, browser visibility changes, tab switches, and window blur events are recorded with tamper-evident cryptographic hashes and placed in the teacher review queue.
            </p>
          </div>

          {/* Audit Telemetry */}
          <div className="p-3 rounded-lg bg-surface-mid border border-border-subdued font-mono-code text-[11px] space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Event Identifier:</span>
              <span className="text-slate-200 font-semibold">{incident.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Recorded Timestamp:</span>
              <span className="text-slate-200">{new Date(incident.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Escalation Status:</span>
              <span className={isEscalated ? 'text-diagnostic-rose font-bold' : 'text-diagnostic-amber'}>
                {isEscalated ? 'Flagged for Mandatory Teacher Review' : 'Active Warning Issued'}
              </span>
            </div>
          </div>

          {isEscalated && (
            <div className="p-2.5 rounded bg-surface-elevated border border-border-prominent text-xs text-slate-300 flex items-start gap-2">
              <FileText className="w-4 h-4 text-neural shrink-0 mt-0.5" />
              <span>
                You have reached 3 integrity warnings. Your entire session replay timeline and code revisions will be submitted for instructor audit upon completion.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border-subdued flex justify-end">
          <button
            onClick={onAcknowledge}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-diagnostic-rose hover:bg-rose-600 text-white font-mono-code text-xs font-bold tracking-wide shadow-lg shadow-diagnostic-rose/30 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Acknowledge & Return to Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
