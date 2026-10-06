import React, { useState } from 'react';
import { SurfaceContext } from './Button';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  surfaceContext?: SurfaceContext;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  surfaceContext = 'light',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  let positionClasses = 'bottom-full left-1/2 -translate-x-1/2 mb-1.5';
  if (position === 'bottom') positionClasses = 'top-full left-1/2 -translate-x-1/2 mt-1.5';
  if (position === 'left') positionClasses = 'right-full top-1/2 -translate-y-1/2 mr-1.5';
  if (position === 'right') positionClasses = 'left-full top-1/2 -translate-y-1/2 ml-1.5';

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 pointer-events-none px-2.5 py-1 text-xs whitespace-nowrap shadow-md border ${positionClasses} ${
            isDark || isFeatured
              ? 'bg-[#FFFFFF] text-[#171717] border-[#CCCCCC]'
              : 'bg-[#171717] text-white border-[#333333]'
          }`}
          style={{ fontFamily: 'WPP, sans-serif', fontSize: '11px', lineHeight: '14px', fontWeight: 400 }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
