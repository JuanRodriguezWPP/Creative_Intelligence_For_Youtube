import React from 'react';
import { SurfaceContext } from './Button';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  size?: 'sm' | 'md';
  surfaceContext?: SurfaceContext;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  size = 'md',
  surfaceContext = 'light',
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  const trackBorder = isDark || isFeatured ? 'border-white/20' : 'border-[#E6E6E5]';
  const heightClass = size === 'sm' ? 'h-8 text-xs' : 'h-10 text-sm';

  return (
    <div
      role="tablist"
      className={`flex items-center gap-6 border-b ${trackBorder} overflow-x-auto ${className}`}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        const isDisabled = tab.disabled;

        let tabClasses = '';

        if (isDark || isFeatured) {
          if (isDisabled) {
            tabClasses = 'text-white/30 border-transparent cursor-not-allowed';
          } else if (isActive) {
            tabClasses = 'text-white font-semibold border-[#AEF366]';
          } else {
            tabClasses = 'text-white/60 border-transparent hover:text-white hover:border-white/40';
          }
        } else {
          // Light Canvas
          if (isDisabled) {
            tabClasses = 'text-[#8A8A88] border-transparent cursor-not-allowed';
          } else if (isActive) {
            tabClasses = 'text-[#171717] font-semibold border-[#171717]';
          } else {
            tabClasses = 'text-[#454544] border-transparent hover:text-[#171717] hover:border-[#CCCCCC]';
          }
        }

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(tab.id)}
            style={{ fontFamily: 'WPP, sans-serif' }}
            className={`inline-flex items-center gap-2 pb-2.5 pt-1 border-b-2 font-medium transition-colors select-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#5967F6] dark:focus-visible:ring-[#7D72E8] focus-visible:rounded-[4px] focus-visible:ring-offset-1 ${heightClass} ${tabClasses}`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-normal ${
                  isActive
                    ? isDark || isFeatured
                      ? 'bg-white/20 text-white'
                      : 'bg-[#171717] text-white'
                    : isDark || isFeatured
                    ? 'bg-white/10 text-white/60'
                    : 'bg-[#F2F2F1] text-[#454544]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
