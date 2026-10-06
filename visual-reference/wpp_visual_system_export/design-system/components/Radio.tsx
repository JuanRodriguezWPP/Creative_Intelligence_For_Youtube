import React from 'react';
import { SurfaceContext } from './Button';

export interface RadioProps {
  label?: string;
  description?: string;
  value: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  forceState?: 'unselected' | 'selected' | 'hover' | 'focus' | 'disabled' | 'error';
  surfaceContext?: SurfaceContext;
  disabled?: boolean;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  description,
  value,
  selectedValue,
  onChange,
  forceState,
  surfaceContext = 'light',
  disabled = false,
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  const isSelected = forceState === 'selected' || (!forceState && value === selectedValue);
  const isError = forceState === 'error';
  const effectiveDisabled = disabled || forceState === 'disabled';

  let ringStyle = '';

  if (isDark || isFeatured) {
    if (effectiveDisabled) {
      ringStyle = 'border-white/20 bg-white/5 cursor-not-allowed';
    } else if (isError) {
      ringStyle = 'border-2 border-[#D9383A] bg-white/5';
    } else if (isSelected) {
      ringStyle = 'border-2 border-white bg-transparent';
    } else if (forceState === 'focus') {
      ringStyle = 'border-[#7D72E8] ring-2 ring-[#7D72E8] ring-offset-2 ring-offset-[#171717] bg-transparent';
    } else if (forceState === 'hover') {
      ringStyle = 'border-white/80 bg-white/10';
    } else {
      ringStyle = 'border border-white/40 bg-transparent hover:border-white/80';
    }
  } else {
    // Light
    if (effectiveDisabled) {
      ringStyle = 'border-[#CCCCCC] bg-[#F8F8F7] cursor-not-allowed';
    } else if (isError) {
      ringStyle = 'border-2 border-[#D9383A] bg-[#FDF0F0]';
    } else if (isSelected) {
      ringStyle = 'border-2 border-[#171717] bg-white';
    } else if (forceState === 'focus') {
      ringStyle = 'border-[#5967F6] ring-2 ring-[#5967F6] ring-offset-2 ring-offset-white bg-white';
    } else if (forceState === 'hover') {
      ringStyle = 'border-[#8A8A88] bg-[#F8F8F7]';
    } else {
      ringStyle = 'border border-[#CCCCCC] bg-white hover:border-[#8A8A88]';
    }
  }

  const dotColor = isDark || isFeatured ? 'bg-white' : 'bg-[#171717]';
  const textColor = isDark || isFeatured ? 'text-white' : 'text-[#171717]';
  const descColor = isDark || isFeatured ? 'text-white/60' : 'text-[#8A8A88]';

  return (
    <label
      className={`flex items-start gap-3 cursor-pointer select-none group w-full ${
        effectiveDisabled ? 'cursor-not-allowed opacity-60' : ''
      } ${className}`}
    >
      {/* Fixed Control Container */}
      <span className="relative flex items-center justify-center w-[18px] h-[18px] shrink-0 mt-[1px]">
        <input
          type="radio"
          value={value}
          checked={isSelected}
          disabled={effectiveDisabled}
          onChange={() => !effectiveDisabled && onChange?.(value)}
          className="sr-only peer"
        />
        <span
          className={`w-[18px] h-[18px] rounded-full transition-colors flex items-center justify-center shrink-0 peer-focus-visible:ring-2 peer-focus-visible:ring-[#5967F6] dark:peer-focus-visible:ring-[#7D72E8] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-[#171717] ${ringStyle}`}
        >
          {isSelected && (
            <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          )}
        </span>
      </span>

      {/* Independent Label Content Area */}
      {(label || description) && (
        <span className="min-w-0 flex-1 flex flex-col justify-center text-xs">
          {label && (
            <span
              style={{ fontFamily: 'WPP, sans-serif', fontSize: '13px', lineHeight: '20px', fontWeight: 500 }}
              className={`block ${textColor} break-words`}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              style={{ fontFamily: 'WPP, sans-serif', fontSize: '11px', lineHeight: '16px', fontWeight: 400 }}
              className={`block ${descColor} mt-0.5 break-words`}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
};
