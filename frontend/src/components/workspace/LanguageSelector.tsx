import React from 'react';
import { SupportedLanguage } from '../../types/arena';
import { ChevronDown, Code } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: SupportedLanguage;
  availableLanguages: SupportedLanguage[];
  onChangeLanguage: (lang: SupportedLanguage) => void;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  availableLanguages,
  onChangeLanguage,
  disabled = false
}) => {
  const languageLabels: Record<SupportedLanguage, string> = {
    python: 'Python 3.10',
    java: 'Java 17',
    cpp: 'C++ 20'
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-mid border border-border-subdued text-xs font-mono-code text-slate-200">
        <Code className="w-3.5 h-3.5 text-neural" />
        <select
          value={selectedLanguage}
          onChange={(e) => onChangeLanguage(e.target.value as SupportedLanguage)}
          disabled={disabled}
          className="bg-transparent text-slate-200 outline-none cursor-pointer pr-4 font-mono-code text-xs disabled:cursor-not-allowed"
        >
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang} className="bg-surface-elevated text-slate-200">
              {languageLabels[lang]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
