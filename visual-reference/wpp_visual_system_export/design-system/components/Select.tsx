import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { SurfaceContext } from './Button';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  supportingText?: string;
  errorMessage?: string;
  selectSize?: 'sm' | 'md' | 'lg';
  forceState?: 'default' | 'hover' | 'focus' | 'open' | 'disabled' | 'error';
  surfaceContext?: SurfaceContext;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  supportingText,
  errorMessage,
  selectSize = 'md',
  forceState,
  surfaceContext = 'light',
  disabled = false,
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const effectiveOpen = forceState === 'open' || isOpen;
  const effectiveDisabled = disabled || forceState === 'disabled';
  const isError = forceState === 'error' || Boolean(errorMessage);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  let heightClass = 'h-10 text-sm';
  if (selectSize === 'sm') heightClass = 'h-8 text-xs';
  if (selectSize === 'lg') heightClass = 'h-12 text-base';

  let borderStyle = '';
  if (isDark || isFeatured) {
    if (isError) {
      borderStyle = 'bg-white/5 border border-[#D9383A] text-white';
    } else if (effectiveOpen || forceState === 'focus') {
      borderStyle = 'bg-white/10 border-[#7D72E8] text-white ring-2 ring-[#7D72E8]/25';
    } else if (forceState === 'hover') {
      borderStyle = 'bg-white/10 border-white/40 text-white';
    } else if (effectiveDisabled) {
      borderStyle = 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed';
    } else {
      borderStyle = 'bg-[#171717] border border-white/20 text-white hover:border-white/40 focus-visible:border-[#7D72E8] focus-visible:ring-2 focus-visible:ring-[#7D72E8]/25';
    }
  } else {
    // Light
    if (isError) {
      borderStyle = 'bg-[#FDF0F0] border-2 border-[#D9383A] text-[#171717]';
    } else if (effectiveOpen || forceState === 'focus') {
      borderStyle = 'bg-white border-[#5967F6] text-[#171717] ring-2 ring-[#5967F6]/20';
    } else if (forceState === 'hover') {
      borderStyle = 'bg-white border border-[#CCCCCC] text-[#171717]';
    } else if (effectiveDisabled) {
      borderStyle = 'bg-[#F8F8F7] border border-[#E6E6E5] text-[#8A8A88] cursor-not-allowed';
    } else {
      borderStyle = 'bg-white border border-[#E6E6E5] hover:border-[#CCCCCC] focus-visible:border-[#5967F6] focus-visible:ring-2 focus-visible:ring-[#5967F6]/20 text-[#171717]';
    }
  }

  const labelColor = isDark || isFeatured ? 'text-white/90' : 'text-[#171717]';

  return (
    <div ref={containerRef} className={`space-y-1.5 relative w-full ${className}`}>
      {label && (
        <label
          style={{ fontFamily: 'WPP, sans-serif', fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}
          className={`block ${labelColor}`}
        >
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        disabled={effectiveDisabled}
        onClick={() => !effectiveDisabled && setIsOpen(!isOpen)}
        style={{ fontFamily: 'WPP, sans-serif', borderRadius: '8px' }}
        className={`w-full flex items-center justify-between px-3 text-left transition-colors outline-none rounded-[8px] ${heightClass} ${borderStyle}`}
      >
        <span className={selectedOption ? 'text-inherit font-normal' : 'text-[#8A8A88]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 shrink-0 ${
            effectiveOpen ? 'rotate-180 text-inherit' : 'text-[#8A8A88]'
          }`}
        />
      </button>

      {/* Dropdown Options Menu */}
      {effectiveOpen && !effectiveDisabled && (
        <div
          style={{ borderRadius: '8px' }}
          className={`absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto border shadow-lg py-1 rounded-[8px] ${
            isDark || isFeatured
              ? 'bg-[#171717] border-white/20 text-white'
              : 'bg-white border-[#E6E6E5] text-[#171717]'
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? isDark || isFeatured
                      ? 'bg-white/15 text-white font-medium'
                      : 'bg-[#F2F2F1] text-[#171717] font-medium'
                    : isDark || isFeatured
                    ? 'text-white/80 hover:bg-white/10 hover:text-white'
                    : 'text-[#454544] hover:bg-[#F8F8F7] hover:text-[#171717]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#171717] dark:text-white shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Error / Supporting text */}
      {isError && errorMessage ? (
        <p className="text-xs text-[#D9383A] flex items-center gap-1 font-medium pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </p>
      ) : supportingText ? (
        <p className="text-xs text-[#8A8A88] pt-0.5">{supportingText}</p>
      ) : null}
    </div>
  );
};
