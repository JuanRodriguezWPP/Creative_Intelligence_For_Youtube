import React from 'react';
import { SurfaceContext } from './Button';

export interface ToggleProps {
  label?: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  forceState?: 'off' | 'on' | 'hover' | 'focus' | 'disabled';
  surfaceContext?: SurfaceContext;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  description,
  checked = false,
  onChange,
  forceState,
  surfaceContext = 'light',
  disabled = false,
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  const isOn = forceState === 'on' || (!forceState && checked);
  const effectiveDisabled = disabled || forceState === 'disabled';

  let trackStyle = '';
  let thumbStyle = '';

  if (isDark || isFeatured) {
    if (effectiveDisabled) {
      trackStyle = 'bg-white/10 cursor-not-allowed';
      thumbStyle = 'bg-white/40';
    } else if (isOn) {
      trackStyle = 'bg-[#AEF366]';
      thumbStyle = 'bg-[#171717] translate-x-4';
    } else if (forceState === 'focus') {
      trackStyle = 'bg-white/20 ring-2 ring-[#7D72E8] ring-offset-2 ring-offset-[#171717]';
      thumbStyle = 'bg-white translate-x-0';
    } else if (forceState === 'hover') {
      trackStyle = 'bg-white/30';
      thumbStyle = 'bg-white translate-x-0';
    } else {
      trackStyle = 'bg-white/20';
      thumbStyle = 'bg-white/80 translate-x-0';
    }
  } else {
    // Light
    if (effectiveDisabled) {
      trackStyle = 'bg-[#E6E6E5] cursor-not-allowed';
      thumbStyle = 'bg-[#CCCCCC]';
    } else if (isOn) {
      trackStyle = 'bg-[#171717]';
      thumbStyle = 'bg-white translate-x-4';
    } else if (forceState === 'focus') {
      trackStyle = 'bg-[#E6E6E5] ring-2 ring-[#5967F6] ring-offset-2 ring-offset-white';
      thumbStyle = 'bg-[#8A8A88] translate-x-0';
    } else if (forceState === 'hover') {
      trackStyle = 'bg-[#CCCCCC]';
      thumbStyle = 'bg-[#454544] translate-x-0';
    } else {
      trackStyle = 'bg-[#E6E6E5]';
      thumbStyle = 'bg-white translate-x-0 shadow-xs border border-[#CCCCCC]';
    }
  }

  const textColor = isDark || isFeatured ? 'text-white' : 'text-[#171717]';
  const descColor = isDark || isFeatured ? 'text-white/60' : 'text-[#8A8A88]';
  const isSingleLine = !description;

  return (
    <label
      className={`flex items-start gap-3 cursor-pointer select-none group w-full ${
        effectiveDisabled ? 'cursor-not-allowed opacity-60' : ''
      } ${className}`}
    >
      {/* Fixed Control Container */}
      <span className="relative flex items-center shrink-0 mt-[1px]">
        <input
          type="checkbox"
          role="switch"
          aria-checked={isOn}
          checked={isOn}
          disabled={effectiveDisabled}
          onChange={(e) => !effectiveDisabled && onChange?.(e.target.checked)}
          className="sr-only peer"
        />
        <span
          className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center shrink-0 peer-focus-visible:ring-2 peer-focus-visible:ring-[#5967F6] dark:peer-focus-visible:ring-[#7D72E8] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-[#171717] ${trackStyle}`}
        >
          <span
            className={`w-4 h-4 rounded-full transition-transform duration-200 transform ${thumbStyle}`}
          />
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
