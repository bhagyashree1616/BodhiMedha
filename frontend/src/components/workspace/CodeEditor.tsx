import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { SupportedLanguage } from '../../types/arena';
import { LanguageSelector } from './LanguageSelector';
import { 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Play, 
  Send, 
  Lock,
  Type,
  Code
} from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChangeCode: (newCode: string) => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  availableLanguages: SupportedLanguage[];
  onRunCode: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  isSubmitting?: boolean;
  submitLabel?: string;
  isAssessmentMode?: boolean;
  blockExternalPaste?: boolean;
  onResetCode: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChangeCode,
  language,
  onChangeLanguage,
  availableLanguages,
  onRunCode,
  onSubmit,
  isRunning,
  isSubmitting = false,
  submitLabel = 'Submit',
  isAssessmentMode = false,
  blockExternalPaste = false,
  onResetCode
}) => {
  const [fontSize, setFontSize] = useState<number>(14);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [monacoLoaded, setMonacoLoaded] = useState<boolean>(false);

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to Run Code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isRunning) {
          onRunCode();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, onRunCode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const getMonacoLanguage = (lang: SupportedLanguage): string => {
    switch (lang) {
      case 'python': return 'python';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'python';
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-editor border-l border-border-subdued select-none">
      {/* Editor Header Toolbar */}
      <div className="h-10 px-3 bg-surface-mid/90 border-b border-border-subdued flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <LanguageSelector
            selectedLanguage={language}
            availableLanguages={availableLanguages}
            onChangeLanguage={onChangeLanguage}
            disabled={isAssessmentMode} // Language locked in formal assessment
          />

          {isAssessmentMode && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-diagnostic-amber bg-diagnostic-amber/10 px-2 py-0.5 rounded border border-diagnostic-amber/20">
              <Lock className="w-3 h-3" />
              <span>Language Locked</span>
            </div>
          )}

          {blockExternalPaste && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-slate-400 bg-surface-elevated px-2 py-0.5 rounded border border-border-subdued hidden md:flex">
              <Lock className="w-3 h-3 text-neural" />
              <span>Clipboard Guard Active</span>
            </div>
          )}
        </div>

        {/* Editor Controls & Action Triggers */}
        <div className="flex items-center gap-2">
          {/* Font scale toggle */}
          <button
            onClick={() => setFontSize(prev => prev === 16 ? 12 : prev + 2)}
            className="p-1.5 rounded hover:bg-surface-elevated text-slate-400 hover:text-white transition-colors"
            title={`Font size: ${fontSize}px (click to cycle)`}
          >
            <Type className="w-3.5 h-3.5" />
          </button>

          {/* Reset Code */}
          <button
            onClick={onResetCode}
            className="p-1.5 rounded hover:bg-surface-elevated text-slate-400 hover:text-white transition-colors"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded hover:bg-surface-elevated text-slate-400 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <div className="h-4 w-px bg-border-prominent mx-1" />

          {/* Run Code (Secondary Engine Trigger) */}
          <button
            onClick={onRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-low hover:bg-surface-mid text-mastery-emerald border border-mastery-emerald/40 hover:border-mastery-emerald font-mono-code text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
            title="Execute current draft in sandbox (Ctrl+Enter)"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          {/* Submit Code (Primary Trigger) */}
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-gradient-to-r from-neural to-neural-deep hover:from-neural-deep hover:to-neural text-white font-mono-code text-xs font-semibold shadow-md shadow-neural/25 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Evaluating...' : submitLabel}</span>
          </button>
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="flex-1 relative overflow-hidden bg-surface-editor">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(val) => onChangeCode(val || '')}
          theme="vs-dark"
          onMount={() => setMonacoLoaded(true)}
          options={{
            fontSize: fontSize,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            bracketPairColorization: { enabled: true },
            formatOnType: true,
            formatOnPaste: true,
            renderLineHighlight: 'all',
            padding: { top: 12, bottom: 12 }
          }}
          loading={
            <div className="flex items-center justify-center h-full text-xs font-mono-code text-slate-500">
              Initializing Monaco Sandbox Environment...
            </div>
          }
        />
      </div>

      {/* Keyboard Shortcut Footer Status */}
      <div className="h-6 px-3 bg-surface-mid/60 border-t border-border-subdued flex items-center justify-between text-[10px] font-mono-code text-slate-500">
        <div className="flex items-center gap-3">
          <span>Encoding: UTF-8</span>
          <span>Tab Size: 4</span>
          <span>Ln {code.split('\n').length}, Col {code.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1 py-0.5 rounded bg-surface-elevated text-slate-300 border border-border-prominent">⌘/Ctrl + ↵</kbd>
          <span>to Run Code</span>
        </div>
      </div>
    </div>
  );
};
