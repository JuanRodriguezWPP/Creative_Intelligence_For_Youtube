import React from 'react';
import { SurfaceContext } from './Button';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface StatusBadgeProps {
  status: StatusType;
  label: string;
  pulse?: boolean;
  size?: 'sm' | 'md';
  surfaceContext?: SurfaceContext;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  pulse = false,
  size = 'md',
  surfaceContext = 'light',
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  let containerClasses = 'px-2 py-0.5 text-xs'; // ~22px height
  let dotSize = 'w-1.5 h-1.5';
  let fontStyle = { fontFamily: 'WPP, sans-serif', fontSize: '11px', lineHeight: '14px', fontWeight: 600, letterSpacing: '0.04em' };

  if (size === 'sm') {
    containerClasses = 'px-1.5 py-0.2 text-[10px]'; // ~18px height
    dotSize = 'w-1 h-1';
    fontStyle = { fontFamily: 'WPP, sans-serif', fontSize: '10px', lineHeight: '12px', fontWeight: 600, letterSpacing: '0.04em' };
  }

  let colorScheme = {
    bg: '',
    text: '',
    border: '',
    dot: '',
  };

  if (isDark || isFeatured) {
    if (status === 'success') {
      colorScheme = {
        bg: 'bg-[#27864E]/25',
        text: 'text-[#8FE0AF]',
        border: 'border-[#35A864]/40',
        dot: 'bg-[#35A864]',
      };
    } else if (status === 'warning') {
      colorScheme = {
        bg: 'bg-[#A96E00]/25',
        text: 'text-[#F9D67E]',
        border: 'border-[#D99000]/40',
        dot: 'bg-[#D99000]',
      };
    } else if (status === 'error') {
      colorScheme = {
        bg: 'bg-[#B32628]/25',
        text: 'text-[#F8A4A6]',
        border: 'border-[#D9383A]/40',
        dot: 'bg-[#D9383A]',
      };
    } else if (status === 'info') {
      colorScheme = {
        bg: 'bg-[#1D5AB2]/25',
        text: 'text-[#9AC2F8]',
        border: 'border-[#2470DF]/40',
        dot: 'bg-[#2470DF]',
      };
    } else {
      // Neutral
      colorScheme = {
        bg: 'bg-white/10',
        text: 'text-white/80',
        border: 'border-white/20',
        dot: 'bg-white/60',
      };
    }
  } else {
    // Light Canvas
    if (status === 'success') {
      colorScheme = {
        bg: 'bg-[#EAF8EF]',
        text: 'text-[#27864E]',
        border: 'border-[#D2F0DC]',
        dot: 'bg-[#35A864]',
      };
    } else if (status === 'warning') {
      colorScheme = {
        bg: 'bg-[#FFF4DE]',
        text: 'text-[#A96E00]',
        border: 'border-[#FFE6B3]',
        dot: 'bg-[#D99000]',
      };
    } else if (status === 'error') {
      colorScheme = {
        bg: 'bg-[#FDF0F0]',
        text: 'text-[#B32628]',
        border: 'border-[#F8D2D3]',
        dot: 'bg-[#D9383A]',
      };
    } else if (status === 'info') {
      colorScheme = {
        bg: 'bg-[#EDF4FD]',
        text: 'text-[#1D5AB2]',
        border: 'border-[#CDE0FA]',
        dot: 'bg-[#2470DF]',
      };
    } else {
      // Neutral
      colorScheme = {
        bg: 'bg-[#F2F2F1]',
        text: 'text-[#454544]',
        border: 'border-[#E6E6E5]',
        dot: 'bg-[#8A8A88]',
      };
    }
  }

  return (
    <span
      style={{ ...fontStyle, borderRadius: '9999px' }}
      className={`inline-flex items-center gap-1.5 border uppercase select-none shrink-0 rounded-full ${containerClasses} ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} ${className}`}
    >
      <span
        className={`rounded-full shrink-0 ${dotSize} ${colorScheme.dot} ${
          pulse ? 'animate-pulse' : ''
        }`}
      />
      <span>{label}</span>
    </span>
  );
};
