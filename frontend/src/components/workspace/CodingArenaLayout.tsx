import React, { useState, useRef, useCallback } from 'react';

interface CodingArenaLayoutProps {
  leftPane: React.ReactNode;
  editorPane: React.ReactNode;
  bottomPane: React.ReactNode;
}

export const CodingArenaLayout: React.FC<CodingArenaLayoutProps> = ({
  leftPane,
  editorPane,
  bottomPane
}) => {
  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(42);
  const [isDraggingX, setIsDraggingX] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Horizontal Drag Handler (Problem Pane vs Editor Pane)
  const handleMouseDownX = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingX(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      // Clamp between 25% and 65%
      if (newWidth >= 25 && newWidth <= 65) {
        setLeftWidthPercent(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingX(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div ref={containerRef} className="flex-1 flex overflow-hidden w-full h-full relative">
      {/* Left Pane (Problem Statement) */}
      <div 
        style={{ width: `${leftWidthPercent}%` }} 
        className="h-full flex flex-col shrink-0 overflow-hidden"
      >
        {leftPane}
      </div>

      {/* Horizontal Splitter */}
      <div
        onMouseDown={handleMouseDownX}
        className={`resizer-x shrink-0 ${isDraggingX ? 'active' : ''}`}
        title="Drag to resize panes"
      />

      {/* Right Column: Code Editor & Bottom Console */}
      <div 
        style={{ width: `${100 - leftWidthPercent}%` }} 
        className="h-full flex flex-col overflow-hidden"
      >
        <div className="flex-1 overflow-hidden">
          {editorPane}
        </div>
        <div className="shrink-0">
          {bottomPane}
        </div>
      </div>
    </div>
  );
};
