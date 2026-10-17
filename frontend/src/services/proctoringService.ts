import { ProctoringEventType, ProctoringIncident } from '../types/assessment';

export type IncidentCallback = (incident: ProctoringIncident) => void;

export class ProctoringService {
  private static warningCount = 0;
  private static listeners: IncidentCallback[] = [];
  private static isMonitoring = false;
  private static lastHash = '0000000000000000000000000000000000000000000000000000000000000000';
  private static activeMediaStream: MediaStream | null = null;

  static subscribe(cb: IncidentCallback): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  static getWarningCount(): number {
    return this.warningCount;
  }

  static resetWarnings(): void {
    this.warningCount = 0;
  }

  static async requestMediaPermissions(): Promise<{ video: boolean; audio: boolean; stream?: MediaStream; error?: string }> {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return { video: false, audio: false, error: 'Media devices API unavailable in current browser.' };
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: true
      });

      this.activeMediaStream = stream;
      return { video: true, audio: true, stream };
    } catch (err: any) {
      return {
        video: false,
        audio: false,
        error: err.name === 'NotAllowedError' 
          ? 'Permission denied. Live camera and audio monitoring require explicit browser authorization.'
          : err.message || 'Failed to initialize proctoring hardware.'
      };
    }
  }

  static stopMediaStream(): void {
    if (this.activeMediaStream) {
      this.activeMediaStream.getTracks().forEach(track => track.stop());
      this.activeMediaStream = null;
    }
  }

  static startMonitoring(strictFullscreen: boolean, blockExternalPaste: boolean): () => void {
    if (this.isMonitoring) return () => {};
    this.isMonitoring = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        this.triggerIncident('FOCUS_LOSS', 'Window focus lost: student switched tabs or minimized assessment window.');
      }
    };

    const handleWindowBlur = () => {
      this.triggerIncident('WINDOW_BLUR', 'Application lost focus: focus shifted outside the assessment workspace.');
    };

    const handleFullscreenChange = () => {
      if (strictFullscreen && !document.fullscreenElement) {
        this.triggerIncident('FULLSCREEN_EXIT', 'Fullscreen mode exited during proctored assessment.');
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      if (blockExternalPaste) {
        // Under BodhiMedha locked decision: external paste is prohibited, internal is permitted
        e.preventDefault();
        this.triggerIncident('PASTE_ATTEMPT', 'External clipboard paste blocked under BodhiMedha Integrity Policy.');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('paste', handlePaste);

    return () => {
      this.isMonitoring = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('paste', handlePaste);
    };
  }

  static triggerIncident(type: ProctoringEventType, description: string): ProctoringIncident {
    this.warningCount += 1;
    const now = new Date().toISOString();
    const eventId = `EV-${Date.now().toString().slice(-6)}`;

    // Hash chaining simulation
    const currentHash = `${this.lastHash.substring(0, 8)}-${eventId}`;
    this.lastHash = currentHash;

    const incident: ProctoringIncident = {
      id: eventId,
      timestamp: now,
      type,
      warningNumber: Math.min(this.warningCount, 3),
      description,
      metadata: {
        lastHash: this.lastHash,
        escalatedToTeacherReview: this.warningCount >= 3
      }
    };

    // Broadcast to UI listeners
    this.listeners.forEach(cb => cb(incident));
    return incident;
  }
}
