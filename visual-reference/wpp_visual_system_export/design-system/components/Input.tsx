import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { SurfaceContext } from './Button';

export type InputVariant = 'default' | 'filled' | 'readonly';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'hover' | 'focus' | 'disabled' | 'error' | 'success';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  supportingText?: string;
  errorMessage?: string;
  successMessage?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  forceState?: InputState;
  surfaceContext?: SurfaceContext;
  leadingIcon?: React.ReactNode;
  trailingAction?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  supportingText,
  errorMessage,
  successMessage,
  variant = 'default',
  inputSize = 'md',
  forceState,
  surfaceContext = 'light',
  disabled = false,
  readOnly = false,
  leadingIcon,
  trailingAction,
  id,
  className = '',
  ...props
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  const generatedId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const effectiveDisabled = disabled || forceState === 'disabled';
  const effectiveReadOnly = readOnly || variant === 'readonly';

  const isError = forceState === 'error' || Boolean(errorMessage);
  const isSuccess = forceState === 'success' || Boolean(successMessage);

  // Height and padding tokens (4px quantum)
  let heightClass = 'h-10 text-sm'; // 40px
  let paddingClass = 'px-3';

  if (inputSize === 'sm') {
    heightClass = 'h-8 text-xs'; // 32px
    paddingClass = 'px-2.5';
  } else if (inputSize === 'lg') {
    heightClass = 'h-12 text-base'; // 48px
    paddingClass = 'px-4';
  }

  // Border & Surface styling
  let containerStyle = '';
  if (isDark || isFeatured) {
    if (isError) {
      containerStyle = 'bg-white/5 border border-[#D9383A] text-white ring-1 ring-[#D9383A]';
    } else if (isSuccess) {
      containerStyle = 'bg-white/5 border border-[#35A864] text-white';
    } else if (forceState === 'focus') {
      containerStyle = 'bg-white/10 border-[#7D72E8] text-white ring-2 ring-[#7D72E8]/25';
    } else if (forceState === 'hover') {
      containerStyle = 'bg-white/10 border-white/40 text-white';
    } else if (effectiveDisabled) {
      containerStyle = 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed';
    } else if (variant === 'filled') {
      containerStyle = 'bg-white/10 border border-transparent text-white focus-within:border-[#7D72E8] focus-within:ring-2 focus-within:ring-[#7D72E8]/25';
    } else {
      // Default outlined
      containerStyle = 'bg-[#171717] border border-white/20 text-white hover:border-white/40 focus-within:border-[#7D72E8] focus-within:ring-2 focus-within:ring-[#7D72E8]/25';
    }
  } else {
    // Light Canvas
    if (isError) {
      containerStyle = 'bg-[#FDF0F0] border-2 border-[#D9383A] text-[#171717]';
    } else if (isSuccess) {
      containerStyle = 'bg-white border border-[#35A864] text-[#171717]';
    } else if (forceState === 'focus') {
      containerStyle = 'bg-white border-[#5967F6] text-[#171717] ring-2 ring-[#5967F6]/20';
    } else if (forceState === 'hover') {
      containerStyle = 'bg-white border border-[#CCCCCC] text-[#171717]';
    } else if (effectiveDisabled) {
      containerStyle = 'bg-[#F8F8F7] border border-[#E6E6E5] text-[#8A8A88] cursor-not-allowed';
    } else if (variant === 'filled') {
      containerStyle = 'bg-[#F8F8F7] border border-transparent hover:border-[#E6E6E5] focus-within:bg-white focus-within:border-[#5967F6] focus-within:ring-2 focus-within:ring-[#5967F6]/20 text-[#171717]';
    } else if (effectiveReadOnly) {
      containerStyle = 'bg-[#F8F8F7] border border-[#E6E6E5] text-[#454544] select-text';
    } else {
      // Default
      containerStyle = 'bg-white border border-[#E6E6E5] hover:border-[#CCCCCC] focus-within:border-[#5967F6] focus-within:ring-2 focus-within:ring-[#5967F6]/20 text-[#171717]';
    }
  }

  const labelColor = isDark || isFeatured ? 'text-white/90' : 'text-[#171717]';
  const helperColor = isDark || isFeatured ? 'text-white/60' : 'text-[#8A8A88]';

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={generatedId}
            style={{ fontFamily: 'WPP, sans-serif', fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}
            className={`block ${labelColor}`}
          >
            {label}
            {props.required && <span className="text-[#D9383A] ml-1">*</span>}
          </label>
          {effectiveReadOnly && (
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8A8A88]">
              Read-Only
            </span>
          )}
        </div>
      )}

      {/* Input container */}
      <div
        style={{ borderRadius: '8px' }}
        className={`flex items-center rounded-[8px] transition-colors ${heightClass} ${paddingClass} ${containerStyle}`}
      >
        {leadingIcon && (
          <span className="mr-2 text-[#8A8A88] shrink-0">{leadingIcon}</span>
        )}

        <input
          id={generatedId}
          disabled={effectiveDisabled}
          readOnly={effectiveReadOnly}
          style={{ fontFamily: 'WPP, sans-serif' }}
          className="w-full bg-transparent border-none outline-none text-inherit placeholder:text-[#8A8A88] disabled:cursor-not-allowed"
          {...props}
        />

        {trailingAction && (
          <div className="ml-2 shrink-0">{trailingAction}</div>
        )}

        {isError && (
          <AlertCircle className="w-4 h-4 text-[#D9383A] shrink-0 ml-2" />
        )}
        {isSuccess && !isError && (
          <CheckCircle2 className="w-4 h-4 text-[#35A864] shrink-0 ml-2" />
        )}
      </div>

      {/* Error / Success / Supporting text */}
      {isError && errorMessage ? (
        <p className="text-xs text-[#D9383A] flex items-center gap-1 font-medium pt-0.5">
          <span>{errorMessage}</span>
        </p>
      ) : isSuccess && successMessage ? (
        <p className="text-xs text-[#27864E] flex items-center gap-1 font-medium pt-0.5">
          <span>{successMessage}</span>
        </p>
      ) : supportingText ? (
        <p className={`text-xs ${helperColor} pt-0.5`}>
          {supportingText}
        </p>
      ) : null}
    </div>
  );
};
