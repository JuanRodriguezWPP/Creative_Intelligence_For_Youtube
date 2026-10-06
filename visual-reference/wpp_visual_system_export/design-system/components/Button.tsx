import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ComponentState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
export type SurfaceContext = 'light' | 'dark' | 'featured';
export type DensityMode = 'comfortable' | 'standard' | 'dense';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  forceState?: ComponentState;
  surfaceContext?: SurfaceContext;
  density?: DensityMode;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  forceState,
  surfaceContext = 'light',
  density = 'standard',
  loading = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  children,
  className = '',
  ...props
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';
  const effectiveLoading = loading || forceState === 'loading';
  const effectiveDisabled = disabled || forceState === 'disabled' || effectiveLoading;

  // Size & Density mapping (4px base scale: 32px, 40px, 48px)
  let heightClass = 'h-10 text-sm'; // 40px medium
  let paddingClass = 'px-4 gap-2';
  let fontStyle = { fontFamily: 'WPP, sans-serif', fontSize: '14px', lineHeight: '20px', fontWeight: 500 };

  if (size === 'sm') {
    heightClass = 'h-8 text-xs'; // 32px
    paddingClass = density === 'dense' ? 'px-2.5 gap-1.5' : 'px-3 gap-1.5';
    fontStyle = { fontFamily: 'WPP, sans-serif', fontSize: '12px', lineHeight: '16px', fontWeight: 500 };
  } else if (size === 'lg') {
    heightClass = 'h-12 text-base'; // 48px
    paddingClass = density === 'comfortable' ? 'px-6 gap-3' : 'px-5 gap-2.5';
    fontStyle = { fontFamily: 'WPP, sans-serif', fontSize: '16px', lineHeight: '24px', fontWeight: 500 };
  } else {
    // Medium
    if (density === 'dense') {
      paddingClass = 'px-3 gap-1.5';
    } else if (density === 'comfortable') {
      paddingClass = 'px-5 gap-2.5';
    }
  }

  // Variant & State classes
  let variantClasses = '';

  if (variant === 'primary') {
    // Primary: Brand Lime (#AEF366) with Black text (#171717)
    if (forceState === 'hover') {
      variantClasses = 'bg-[#9DE852] text-[#171717] shadow-sm';
    } else if (forceState === 'active') {
      variantClasses = 'bg-[#8CD840] text-[#171717] translate-y-px';
    } else if (forceState === 'focus') {
      variantClasses = 'bg-[#AEF366] text-[#171717] ring-2 ring-[#5967F6] dark:ring-[#7D72E8] ring-offset-2 ring-offset-white dark:ring-offset-[#171717]';
    } else if (effectiveDisabled) {
      variantClasses = 'bg-[#E6E6E5] text-[#8A8A88] cursor-not-allowed border-transparent';
    } else {
      variantClasses = 'bg-[#AEF366] text-[#171717] hover:bg-[#9DE852] active:bg-[#8CD840] focus-visible:ring-2 focus-visible:ring-[#5967F6] dark:focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2';
    }
  } else if (variant === 'secondary') {
    // Secondary: Neutral surface with subtle border
    if (isDark || isFeatured) {
      if (forceState === 'hover') {
        variantClasses = 'bg-white/10 text-white border-white/40';
      } else if (forceState === 'active') {
        variantClasses = 'bg-white/15 text-white border-white/60';
      } else if (forceState === 'focus') {
        variantClasses = 'bg-transparent text-white border-[#7D72E8] ring-2 ring-[#7D72E8] ring-offset-2 ring-offset-[#171717]';
      } else if (effectiveDisabled) {
        variantClasses = 'bg-transparent text-white/30 border-white/15 cursor-not-allowed';
      } else {
        variantClasses = 'bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 active:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2';
      }
    } else {
      // Light
      if (forceState === 'hover') {
        variantClasses = 'bg-[#F2F2F1] text-[#171717] border-[#CCCCCC]';
      } else if (forceState === 'active') {
        variantClasses = 'bg-[#E6E6E5] text-[#171717] border-[#AAAAAA]';
      } else if (forceState === 'focus') {
        variantClasses = 'bg-white text-[#171717] border-[#5967F6] ring-2 ring-[#5967F6] ring-offset-2 ring-offset-white';
      } else if (effectiveDisabled) {
        variantClasses = 'bg-[#F8F8F7] text-[#8A8A88] border-[#E6E6E5] cursor-not-allowed';
      } else {
        variantClasses = 'bg-white text-[#171717] border border-[#E6E6E5] hover:bg-[#F2F2F1] hover:border-[#CCCCCC] active:bg-[#E6E6E5] focus-visible:ring-2 focus-visible:ring-[#5967F6] focus-visible:ring-offset-2';
      }
    }
  } else if (variant === 'tertiary') {
    // Tertiary: Text-based with subtle hover
    if (isDark || isFeatured) {
      if (forceState === 'hover') {
        variantClasses = 'bg-white/10 text-white';
      } else if (forceState === 'active') {
        variantClasses = 'bg-white/15 text-white';
      } else if (forceState === 'focus') {
        variantClasses = 'text-white ring-2 ring-[#7D72E8] ring-offset-2 ring-offset-[#171717]';
      } else if (effectiveDisabled) {
        variantClasses = 'text-white/30 cursor-not-allowed';
      } else {
        variantClasses = 'bg-transparent text-white hover:bg-white/10 active:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2';
      }
    } else {
      // Light
      if (forceState === 'hover') {
        variantClasses = 'bg-[#F2F2F1] text-[#171717]';
      } else if (forceState === 'active') {
        variantClasses = 'bg-[#E6E6E5] text-[#171717]';
      } else if (forceState === 'focus') {
        variantClasses = 'text-[#171717] ring-2 ring-[#5967F6] ring-offset-2 ring-offset-white';
      } else if (effectiveDisabled) {
        variantClasses = 'text-[#8A8A88] cursor-not-allowed';
      } else {
        variantClasses = 'bg-transparent text-[#454544] hover:bg-[#F2F2F1] hover:text-[#171717] active:bg-[#E6E6E5] focus-visible:ring-2 focus-visible:ring-[#5967F6] focus-visible:ring-offset-2';
      }
    }
  } else if (variant === 'destructive') {
    // Destructive: Contained subtle Semantic Red (#D9383A)
    if (forceState === 'hover') {
      variantClasses = 'bg-[#B32628] text-white border-transparent';
    } else if (forceState === 'active') {
      variantClasses = 'bg-[#8F1E20] text-white border-transparent';
    } else if (forceState === 'focus') {
      variantClasses = 'bg-[#D9383A] text-white ring-2 ring-[#5967F6] dark:ring-[#7D72E8] ring-offset-2 ring-offset-white';
    } else if (effectiveDisabled) {
      variantClasses = 'bg-[#FDF0F0] text-[#D9383A]/40 border-transparent cursor-not-allowed';
    } else {
      variantClasses = 'bg-[#D9383A] text-white hover:bg-[#B32628] active:bg-[#8F1E20] focus-visible:ring-2 focus-visible:ring-[#5967F6] dark:focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2';
    }
  }

  return (
    <button
      disabled={effectiveDisabled}
      style={{ ...fontStyle, borderRadius: '9999px' }}
      className={`inline-flex items-center justify-center font-medium transition-colors select-none outline-none shrink-0 rounded-full ${heightClass} ${paddingClass} ${variantClasses} ${className}`}
      {...props}
    >
      {effectiveLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
          <span>{children}</span>
          {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
        </>
      )}
    </button>
  );
};
