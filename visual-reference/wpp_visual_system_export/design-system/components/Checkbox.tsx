import React from 'react';
import { Check, Minus } from 'lucide-react';
import { SurfaceContext } from './Button';

export interface CheckboxProps {
  label?: string;
  description?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  forceState?: 'unchecked' | 'checked' | 'indeterminate' | 'hover' | 'focus' | 'disabled' | 'error';
  surfaceContext?: SurfaceContext;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked = false,
  indeterminate = false,
  onChange,
  forceState,
  surfaceContext = 'light',
  disabled = false,
  id,
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  const isChecked = forceState === 'checked' || (!forceState && checked);
  const isIndeterminate = forceState === 'indeterminate' || (!forceState && indeterminate);
  const isError = forceState === 'error';
  const effectiveDisabled = disabled || forceState === 'disabled';

  let boxStyles = '';

  if (isDark || isFeatured) {
    if (effectiveDisabled) {
      boxStyles = isChecked || isIndeterminate
        ? 'bg-white/20 border-transparent text-white/40 cursor-not-allowed'
        : 'border-white/20 bg-white/5 cursor-not-allowed';
    } else if (isError) {
      boxStyles = 'border-2 border-[#D9383A] bg-white/5';
    } else if (isChecked || isIndeterminate) {
      boxStyles = 'bg-white text-[#171717] border-white';
    } else if (forceState === 'focus') {
      boxStyles = 'border-[#7D72E8] ring-2 ring-[#7D72E8] ring-offset-2 ring-offset-[#171717] bg-transparent';
    } else if (forceState === 'hover') {
      boxStyles = 'border-white/60 bg-white/10';
    } else {
      boxStyles = 'border border-white/40 bg-transparent hover:border-white/60';
    }
  } else {
    // Light Canvas: Checked uses solid neutral.900 (#171717), NOT Lime!
    if (effectiveDisabled) {
      boxStyles = isChecked || isIndeterminate
        ? 'bg-[#CCCCCC] border-transparent text-[#8A8A88] cursor-not-allowed'
        : 'border-[#E6E6E5] bg-[#F8F8F7] cursor-not-allowed';
    } else if (isError) {
      boxStyles = 'border-2 border-[#D9383A] bg-[#FDF0F0]';
    } else if (isChecked || isIndeterminate) {
      boxStyles = 'bg-[#171717] text-white border-[#171717]';
    } else if (forceState === 'focus') {
      boxStyles = 'border-[#5967F6] ring-2 ring-[#5967F6] ring-offset-2 ring-offset-white bg-white';
    } else if (forceState === 'hover') {
      boxStyles = 'border-[#8A8A88] bg-[#F8F8F7]';
    } else {
      boxStyles = 'border border-[#CCCCCC] bg-white hover:border-[#8A8A88]';
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
      <span className="relative flex items-center justify-center w-[18px] h-[18px] shrink-0 mt-[1px]">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={effectiveDisabled}
          onChange={(e) => !effectiveDisabled && onChange?.(e.target.checked)}
          className="sr-only peer"
        />
        <span
          style={{ borderRadius: '4px' }}
          className={`w-[18px] h-[18px] rounded-[4px] transition-colors flex items-center justify-center shrink-0 peer-focus-visible:ring-2 peer-focus-visible:ring-[#5967F6] dark:peer-focus-visible:ring-[#7D72E8] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-[#171717] ${boxStyles}`}
        >
          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          {isIndeterminate && <Minus className="w-3.5 h-3.5 stroke-[3]" />}
        </span>
      </span>

      {/* Independent Label Content Area */}
      {(label || description) && (
        <span className="min-w-0 flex-1 flex flex-col justify-center text-xs">
          {label && (
            <span
              style={{ fontFamily: 'WPP, sans-serif', fontSize: '13px', lineHeight: '20px', fontWeight: 500 }}
              className={`block ${textColor} ${effectiveDisabled ? '' : 'group-hover:text-inherit'} break-words`}
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
