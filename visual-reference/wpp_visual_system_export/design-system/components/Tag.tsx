import React from 'react';
import { X } from 'lucide-react';
import { SurfaceContext } from './Button';

export type TagVariant = 'neutral' | 'blue' | 'violet' | 'brand';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  leadingIcon?: React.ReactNode;
  onDismiss?: () => void;
  surfaceContext?: SurfaceContext;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  leadingIcon,
  onDismiss,
  surfaceContext = 'light',
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  let sizeClasses = 'text-xs px-2.5 py-0.5 h-6'; // 24px
  let fontStyle = { fontFamily: 'WPP, sans-serif', fontSize: '12px', lineHeight: '16px', fontWeight: 500 };

  if (size === 'sm') {
    sizeClasses = 'text-[11px] px-2 py-0.5 h-5'; // 20px
    fontStyle = { fontFamily: 'WPP, sans-serif', fontSize: '11px', lineHeight: '14px', fontWeight: 500 };
  }

  let colorClasses = '';

  if (isDark || isFeatured) {
    if (variant === 'blue') {
      colorClasses = 'bg-[#1D5AB2]/25 text-[#9AC2F8] border border-[#2470DF]/40';
    } else if (variant === 'violet') {
      colorClasses = 'bg-[#6139B3]/25 text-[#D1B8FC] border border-[#7B4DDB]/40';
    } else if (variant === 'brand') {
      colorClasses = 'bg-[#AEF366]/20 text-[#AEF366] border border-[#AEF366]/40';
    } else {
      // Neutral
      colorClasses = 'bg-white/10 text-white/90 border border-white/20';
    }
  } else {
    // Light
    if (variant === 'blue') {
      colorClasses = 'bg-[#EDF4FD] text-[#1D5AB2] border border-[#CDE0FA]';
    } else if (variant === 'violet') {
      colorClasses = 'bg-[#F4F0FD] text-[#6139B3] border border-[#DDD0F8]';
    } else if (variant === 'brand') {
      colorClasses = 'bg-[#F2FEDE] text-[#3E650C] border border-[#D7FCA5]';
    } else {
      // Neutral
      colorClasses = 'bg-[#F2F2F1] text-[#454544] border border-[#E6E6E5]';
    }
  }

  return (
    <span
      style={{ ...fontStyle, borderRadius: '9999px' }}
      className={`inline-flex items-center gap-1.5 select-none font-medium shrink-0 transition-colors rounded-full ${sizeClasses} ${colorClasses} ${className}`}
    >
      {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      <span>{label}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={`Remove ${label} tag`}
          className="ml-0.5 hover:opacity-75 focus:outline-none shrink-0"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
