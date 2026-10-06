import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SurfaceContext } from './Button';
import { Check } from 'lucide-react';

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'auto';

export interface DropdownMenuItemProps {
  id?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  metadata?: string;
  selected?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  forceState?: 'default' | 'hover' | 'focus' | 'selected' | 'disabled';
  onClick?: () => void;
  surfaceContext?: SurfaceContext;
  className?: string;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items?: DropdownMenuItemProps[];
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: DropdownPlacement;
  surfaceContext?: SurfaceContext;
  minWidth?: string;
  maxWidth?: string;
  className?: string;
  menuClassName?: string;
  align?: 'start' | 'end';
}

/**
 * ====================================================================
 * 04 · CORE COMPONENTS — DROPDOWN / MENU
 * 
 * "Dropdown / Menu is floating interaction UI, not a Card."
 * "Floating UI may use elevation when required to establish separation from the underlying surface."
 * "Component states should remain consistent with the broader interaction system."
 * ====================================================================
 */

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  label,
  icon,
  shortcut,
  metadata,
  selected = false,
  disabled = false,
  destructive = false,
  forceState,
  onClick,
  surfaceContext = 'light',
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  const isSimulatedHover = forceState === 'hover';
  const isSimulatedFocus = forceState === 'focus';
  const isEffectiveSelected = forceState === 'selected' || selected;
  const isEffectiveDisabled = forceState === 'disabled' || disabled;

  // Base typography & layout
  // Items use approved 12px WPP typography with 8px horizontal / vertical balance
  let itemClasses =
    'relative w-full flex items-center justify-between gap-3 px-3 py-2 text-xs rounded-[6px] text-left transition-colors font-sans outline-none select-none';

  if (isEffectiveDisabled) {
    itemClasses += isDark || isFeatured
      ? ' text-white/40 cursor-not-allowed pointer-events-none'
      : ' text-[#8A8A88] cursor-not-allowed pointer-events-none';
  } else if (destructive) {
    if (isDark || isFeatured) {
      itemClasses += isSimulatedHover || isSimulatedFocus
        ? ' bg-[#D9383A]/20 text-[#FF6B6B]'
        : ' text-[#FF6B6B] hover:bg-[#D9383A]/20';
    } else {
      itemClasses += isSimulatedHover || isSimulatedFocus
        ? ' bg-[#FDF0F0] text-[#D9383A]'
        : ' text-[#D9383A] hover:bg-[#FDF0F0]';
    }
  } else if (isEffectiveSelected) {
    if (isFeatured) {
      itemClasses += ' bg-[#1C2C18] text-[#AEF366] font-medium border-l-2 border-[#AEF366] pl-2.5';
    } else if (isDark) {
      itemClasses += ' bg-white/15 text-white font-medium border-l-2 border-[#AEF366] pl-2.5';
    } else {
      itemClasses += ' bg-[#F2F2F1] text-[#171717] font-medium border-l-2 border-[#171717] pl-2.5';
    }
  } else {
    // Standard Interactive Item
    if (isFeatured) {
      itemClasses += isSimulatedHover
        ? ' bg-[#192615] text-white'
        : isSimulatedFocus
        ? ' bg-[#192615] text-white ring-2 ring-[#7D72E8]'
        : ' text-white/80 hover:bg-[#192615] hover:text-white focus-visible:bg-[#192615] focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[#7D72E8]';
    } else if (isDark) {
      itemClasses += isSimulatedHover
        ? ' bg-white/10 text-white'
        : isSimulatedFocus
        ? ' bg-white/10 text-white ring-2 ring-[#7D72E8]'
        : ' text-white/80 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[#7D72E8]';
    } else {
      itemClasses += isSimulatedHover
        ? ' bg-[#F8F8F7] text-[#171717]'
        : isSimulatedFocus
        ? ' bg-[#F8F8F7] text-[#171717] ring-2 ring-[#5967F6]'
        : ' text-[#454544] hover:bg-[#F8F8F7] hover:text-[#171717] focus-visible:bg-[#F8F8F7] focus-visible:text-[#171717] focus-visible:ring-2 focus-visible:ring-[#5967F6]';
    }
  }

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={isEffectiveDisabled ? -1 : 0}
      aria-disabled={isEffectiveDisabled ? true : undefined}
      aria-selected={isEffectiveSelected ? true : undefined}
      disabled={isEffectiveDisabled}
      onClick={isEffectiveDisabled ? undefined : onClick}
      className={`${itemClasses} ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {icon && (
          <span
            className={`w-4 h-4 shrink-0 flex items-center justify-center ${
              isEffectiveDisabled
                ? 'opacity-40'
                : destructive
                ? 'text-[#D9383A] dark:text-[#FF6B6B]'
                : isEffectiveSelected && (isDark || isFeatured)
                ? 'text-[#AEF366]'
                : isDark || isFeatured
                ? 'text-white/70'
                : 'text-[#8A8A88]'
            }`}
          >
            {icon}
          </span>
        )}
        <span className="truncate leading-tight">{label}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-2">
        {metadata && (
          <span
            className={`font-mono text-[10px] ${
              isDark || isFeatured ? 'text-white/40' : 'text-[#8A8A88]'
            }`}
          >
            {metadata}
          </span>
        )}

        {shortcut && (
          <kbd
            className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${
              isDark || isFeatured
                ? 'bg-white/5 border-white/10 text-white/50'
                : 'bg-[#F2F2F1] border-[#E6E6E5] text-[#8A8A88]'
            }`}
          >
            {shortcut}
          </kbd>
        )}

        {isEffectiveSelected && (
          <Check
            className={`w-3.5 h-3.5 shrink-0 ${
              isFeatured || isDark ? 'text-[#AEF366]' : 'text-[#171717]'
            }`}
          />
        )}
      </div>
    </button>
  );
};

export const DropdownMenuDivider: React.FC<{ surfaceContext?: SurfaceContext; className?: string }> = ({
  surfaceContext = 'light',
  className = '',
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  return (
    <div
      role="separator"
      className={`my-1 border-t ${
        isFeatured
          ? 'border-[#27381F]'
          : isDark
          ? 'border-white/10'
          : 'border-[#E6E6E5]'
      } ${className}`}
    />
  );
};

export const DropdownMenuGroupLabel: React.FC<{
  label: string;
  surfaceContext?: SurfaceContext;
  className?: string;
}> = ({ label, surfaceContext = 'light', className = '' }) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  return (
    <div
      className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold ${
        isDark || isFeatured ? 'text-white/40' : 'text-[#8A8A88]'
      } ${className}`}
    >
      {label}
    </div>
  );
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'auto',
  surfaceContext = 'light',
  minWidth = 'min-w-[200px]',
  maxWidth = 'max-w-[340px]',
  className = '',
  menuClassName = '',
  align = 'start',
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const [computedPlacement, setComputedPlacement] = useState<'bottom' | 'top'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  const handleOpenToggle = useCallback(() => {
    const nextState = !isOpen;
    if (!isControlled) {
      setUncontrolledOpen(nextState);
    }
    onOpenChange?.(nextState);
  }, [isOpen, isControlled, onOpenChange]);

  const handleClose = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // Smart viewport collision detection (opens upward if insufficient space below)
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    if (placement === 'top-start' || placement === 'top-end') {
      setComputedPlacement('top');
      return;
    }

    if (placement === 'bottom-start' || placement === 'bottom-end') {
      setComputedPlacement('bottom');
      return;
    }

    // Auto placement: measure space to bottom of viewport
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const estimatedMenuHeight = 240;

    if (spaceBelow < estimatedMenuHeight && rect.top > estimatedMenuHeight) {
      setComputedPlacement('top');
    } else {
      setComputedPlacement('bottom');
    }
  }, [isOpen, placement]);

  // Floating menu surface styling:
  // "Surface contrast first. Shadow second."
  // 8px structured radius matching Core Component standard.
  const menuSurfaceClasses = isFeatured
    ? 'bg-[#121A0F] text-white border border-[#AEF366]/20 shadow-lg shadow-black/40'
    : isDark
    ? 'bg-[#1F1F1F] text-white border border-white/15 shadow-lg shadow-black/40'
    : 'bg-white text-[#171717] border border-[#E6E6E5] shadow-lg shadow-black/5';

  const positionClasses =
    computedPlacement === 'top'
      ? align === 'end'
        ? 'bottom-full right-0 mb-1.5'
        : 'bottom-full left-0 mb-1.5'
      : align === 'end'
      ? 'top-full right-0 mt-1.5'
      : 'top-full left-0 mt-1.5';

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Area with accessible aria attributes */}
      <div
        onClick={handleOpenToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex"
      >
        {trigger}
      </div>

      {/* Floating Menu Popover */}
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          tabIndex={-1}
          style={{ borderRadius: '8px' }}
          className={`absolute z-50 p-1 rounded-[8px] ${minWidth} ${maxWidth} ${positionClasses} ${menuSurfaceClasses} ${menuClassName}`}
        >
          {items && items.length > 0
            ? items.map((item, idx) => (
                <DropdownMenuItem
                  key={item.id || idx}
                  {...item}
                  surfaceContext={surfaceContext}
                  onClick={() => {
                    item.onClick?.();
                    handleClose();
                  }}
                />
              ))
            : children}
        </div>
      )}
    </div>
  );
};
