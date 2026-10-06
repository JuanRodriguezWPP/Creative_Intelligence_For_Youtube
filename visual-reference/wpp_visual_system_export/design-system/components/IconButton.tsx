import React from 'react';
import { ComponentState, SurfaceContext } from './Button';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'standard' | 'ghost' | 'destructive';
  forceState?: ComponentState;
  surfaceContext?: SurfaceContext;
}

export const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon,
  size = 'md',
  variant = 'standard',
  forceState,
  surfaceContext = 'light',
  disabled = false,
  className = '',
  ...props
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';
  const effectiveDisabled = disabled || forceState === 'disabled';

  let boxClass = 'w-10 h-10'; // 40px
  let iconPixelSize = 20;
  let iconSizeClass = 'w-5 h-5';

  if (size === 'sm') {
    boxClass = 'w-8 h-8'; // 32px
    iconPixelSize = 18; // 18px (within 16-20px range)
    iconSizeClass = 'w-[18px] h-[18px]';
  } else if (size === 'lg') {
    boxClass = 'w-12 h-12'; // 48px
    iconPixelSize = 24; // 24px
    iconSizeClass = 'w-6 h-6';
  }

  // Ensure icon component adheres strictly to container bounds and optical centering
  const renderedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        size: iconPixelSize,
        className: `${iconSizeClass} shrink-0 ${(icon.props as any)?.className || ''}`,
      })
    : icon;

  let variantClass = '';

  if (variant === 'standard') {
    if (isDark || isFeatured) {
      if (forceState === 'hover') {
        variantClass = 'bg-white/10 text-white border border-white/40';
      } else if (forceState === 'active') {
        variantClass = 'bg-white/20 text-white border border-white/60';
      } else if (forceState === 'focus') {
        variantClass = 'bg-transparent text-white border border-[#7D72E8] ring-2 ring-[#7D72E8] ring-offset-2 ring-offset-[#171717]';
      } else if (effectiveDisabled) {
        variantClass = 'bg-transparent text-white/20 border border-white/10 cursor-not-allowed';
      } else {
        variantClass = 'bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 active:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]';
      }
    } else {
      if (forceState === 'hover') {
        variantClass = 'bg-[#F2F2F1] text-[#171717] border border-[#CCCCCC]';
      } else if (forceState === 'active') {
        variantClass = 'bg-[#E6E6E5] text-[#171717] border border-[#AAAAAA]';
      } else if (forceState === 'focus') {
        variantClass = 'bg-white text-[#171717] border border-[#5967F6] ring-2 ring-[#5967F6] ring-offset-2 ring-offset-white';
      } else if (effectiveDisabled) {
        variantClass = 'bg-[#F8F8F7] text-[#8A8A88] border border-[#E6E6E5] cursor-not-allowed';
      } else {
        variantClass = 'bg-white text-[#454544] border border-[#E6E6E5] hover:bg-[#F2F2F1] hover:text-[#171717] hover:border-[#CCCCCC] active:bg-[#E6E6E5] focus-visible:ring-2 focus-visible:ring-[#5967F6] focus-visible:ring-offset-2';
      }
    }
  } else if (variant === 'ghost') {
    if (isDark || isFeatured) {
      variantClass = 'text-white/80 hover:text-white hover:bg-white/10 active:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]';
    } else {
      variantClass = 'text-[#454544] hover:text-[#171717] hover:bg-[#F2F2F1] active:bg-[#E6E6E5] focus-visible:ring-2 focus-visible:ring-[#5967F6] focus-visible:ring-offset-2';
    }
  } else if (variant === 'destructive') {
    variantClass = 'text-[#D9383A] hover:bg-[#FDF0F0] hover:text-[#B32628] active:bg-[#FCE6E6] focus-visible:ring-2 focus-visible:ring-[#5967F6] dark:focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2';
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={effectiveDisabled}
      style={{ borderRadius: '8px' }}
      className={`inline-flex items-center justify-center rounded-[8px] transition-colors outline-none shrink-0 overflow-hidden ${boxClass} ${variantClass} ${className}`}
      {...props}
    >
      <span className={`inline-flex items-center justify-center shrink-0 ${iconSizeClass} pointer-events-none`}>
        {renderedIcon}
      </span>
    </button>
  );
};
