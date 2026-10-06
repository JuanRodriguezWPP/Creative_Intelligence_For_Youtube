import React from 'react';
import { SurfaceContext, DensityMode, Button } from '../core-components/ui/Button';
import { AlertCircle, Inbox, RotateCw, ChevronDown, Plus, Minus } from 'lucide-react';

export type CardPadding = 'compact' | 'standard' | 'spacious' | 'none';
export type CardRadius = 'default' | 'large';
export type CardElevation = 'flat' | 'floating';
export type CardBorderTreatment = 'none' | 'subtle' | 'gradient' | 'active';

/**
 * ====================================================================
 * 05 · CARD SYSTEM — APPROVED CARD STATES
 * "State changes behavior, not Card architecture."
 * 
 * 01 · STATIC (Default passive container)
 * 02 · INTERACTIVE (Clickable, accessible affordance)
 * 03 · HOVER (Subtle transient elevation/border shift)
 * 04 · FOCUS (Visible keyboard navigation ring)
 * 05 · SELECTED (Active/chosen in selection group)
 * 06 · DISABLED (Unavailable, accessible contrast, non-interactive)
 * 07 · LOADING (Structured skeleton preserving layout)
 * 08 · ERROR (Localized semantic failure message + retry)
 * 09 · EMPTY (Clear explanation of absence + action)
 * ====================================================================
 */
export type CardState =
  | 'static'
  | 'interactive'
  | 'hover'
  | 'focus'
  | 'selected'
  | 'disabled'
  | 'loading'
  | 'error'
  | 'empty';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surfaceContext?: SurfaceContext;
  padding?: CardPadding;
  radius?: CardRadius;
  density?: DensityMode;
  elevation?: CardElevation;
  border?: CardBorderTreatment;
  interactive?: boolean;
  state?: CardState;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  featuredGradient?: boolean;
  equalHeight?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface CardContextValue {
  surfaceContext: SurfaceContext;
  density: DensityMode;
  padding: CardPadding;
  radius: CardRadius;
  equalHeight: boolean;
  state?: CardState;
}

export const CardContext = React.createContext<CardContextValue>({
  surfaceContext: 'light',
  density: 'standard',
  padding: 'standard',
  radius: 'default',
  equalHeight: false,
  state: 'static',
});

export const useCardContext = () => React.useContext(CardContext);

export const Card: React.FC<CardProps> = ({
  surfaceContext = 'light',
  padding = 'standard',
  radius = 'default',
  density = 'standard',
  elevation = 'flat',
  border = 'subtle',
  interactive = false,
  state = 'static',
  selected = false,
  disabled = false,
  loading = false,
  featuredGradient = false,
  equalHeight = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const isDark = surfaceContext === 'dark';
  const isFeatured = surfaceContext === 'featured';

  // State Priority:
  // ERROR / DISABLED / SELECTED / FOCUS / HOVER / DEFAULT
  const effectiveDisabled = disabled || state === 'disabled';
  const effectiveSelected = !effectiveDisabled && (selected || state === 'selected');
  const effectiveInteractive = !effectiveDisabled && (interactive || state === 'interactive' || state === 'hover' || state === 'focus' || effectiveSelected);
  const isHoverState = !effectiveDisabled && state === 'hover';
  const isFocusState = !effectiveDisabled && state === 'focus';

  // 03 · Radius presets (16px default, 24px large)
  const radiusClass = radius === 'large' ? 'rounded-[24px]' : 'rounded-[16px]';
  const radiusStyle = { borderRadius: radius === 'large' ? '24px' : '16px' };

  // 02 · Padding presets (Compact: 16px, Standard: 24px, Spacious: 32px)
  let paddingClass = 'p-6'; // 24px standard
  if (padding === 'compact') {
    paddingClass = 'p-4'; // 16px compact
  } else if (padding === 'spacious') {
    paddingClass = 'p-8'; // 32px spacious
  } else if (padding === 'none') {
    paddingClass = 'p-0';
  }

  // Adjust padding for density mode if standard
  if (padding !== 'none') {
    if (density === 'dense' && padding === 'standard') {
      paddingClass = 'p-4';
    } else if (density === 'comfortable' && padding === 'standard') {
      paddingClass = 'p-8';
    }
  }

  // 04 · Surface Context, Elevation & State Response
  // "Surface contrast first. Border second. Shadow last."
  // "Default elevation treatment is box-shadow: none; no decorative shadows."
  let surfaceClasses = '';
  const shadowClass = elevation === 'floating' ? 'shadow-md shadow-black/5 dark:shadow-black/20' : 'shadow-none';

  // Border treatment resolution
  const isBorderless = border === 'none';
  const isGradientBorder = border === 'gradient';
  const defaultBorderLight = isBorderless ? 'border-0' : 'border border-[#E6E6E5]';
  const defaultBorderDark = isBorderless ? 'border-0' : 'border border-white/10';
  const defaultBorderFeatured = isBorderless ? 'border-0' : 'border border-[#AEF366]/20';

  if (isFeatured) {
    surfaceClasses = `bg-[#121A0F] text-white ${defaultBorderFeatured} relative overflow-hidden ${shadowClass}`;
    if (isGradientBorder) {
      surfaceClasses += ' ring-1 ring-[#AEF366]/60 border-[#AEF366]';
    }
    if (effectiveSelected) {
      surfaceClasses += ' ring-2 ring-[#AEF366] border-[#AEF366] bg-[#172514]';
    } else if (isFocusState) {
      surfaceClasses += ' ring-2 ring-[#7D72E8] ring-offset-2 ring-offset-[#0D130B] border-[#7D72E8]/60 outline-none';
    } else if (isHoverState) {
      surfaceClasses += ' border-[#AEF366]/40 bg-[#162213]';
    } else if (effectiveInteractive) {
      surfaceClasses += ' hover:border-[#AEF366]/40 hover:bg-[#162213] active:bg-[#182715] transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D130B] focus-visible:outline-none';
    }
  } else if (isDark) {
    surfaceClasses = `bg-[#1F1F1F] text-white ${defaultBorderDark} relative overflow-hidden ${shadowClass}`;
    if (isGradientBorder) {
      surfaceClasses += ' ring-1 ring-[#5967F6] border-[#7D72E8]';
    }
    if (effectiveSelected) {
      surfaceClasses += ' ring-2 ring-[#AEF366] border-[#AEF366] bg-[#1E261B]';
    } else if (isFocusState) {
      surfaceClasses += ' ring-2 ring-[#7D72E8] ring-offset-2 ring-offset-[#171717] border-[#7D72E8]/60 outline-none';
    } else if (isHoverState) {
      surfaceClasses += ' border-white/30 bg-[#262626]';
    } else if (effectiveInteractive) {
      surfaceClasses += ' hover:border-white/30 hover:bg-[#262626] active:bg-[#2B2B2B] transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7D72E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] focus-visible:outline-none';
    }
  } else {
    // Light
    surfaceClasses = `bg-white text-[#171717] ${defaultBorderLight} relative overflow-hidden ${shadowClass}`;
    if (isGradientBorder) {
      surfaceClasses += ' ring-1.5 ring-[#5967F6] border-transparent bg-gradient-to-br from-white via-white to-[#F8FAF4]';
    }
    if (effectiveSelected) {
      surfaceClasses += ' ring-2 ring-[#171717] border-[#171717] bg-[#F8FAF4]';
    } else if (isFocusState) {
      surfaceClasses += ' ring-2 ring-[#5967F6] ring-offset-2 ring-offset-[#F8F8F7] border-[#5967F6] outline-none';
    } else if (isHoverState) {
      surfaceClasses += ' border-[#AAAAAA] bg-[#FAF9F8]';
    } else if (effectiveInteractive) {
      surfaceClasses += ' hover:border-[#AAAAAA] hover:bg-[#FAF9F8] active:bg-[#F2F2F1] transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#5967F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F8F7] focus-visible:outline-none';
    }
  }

  // Disabled treatment: accessible contrast preserved, click & hover suppressed
  const disabledClasses = effectiveDisabled ? 'opacity-50 pointer-events-none select-none cursor-not-allowed' : '';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (effectiveInteractive && !effectiveDisabled && onClick) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e as any);
      }
    }
    props.onKeyDown?.(e);
  };

  return (
    <CardContext.Provider value={{ surfaceContext, density, padding, radius, equalHeight, state }}>
      <div
        style={radiusStyle}
        className={`flex flex-col ${radiusClass} ${paddingClass} ${surfaceClasses} ${disabledClasses} ${equalHeight ? 'h-full' : ''} ${className}`}
        onClick={effectiveDisabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        role={effectiveInteractive ? 'button' : undefined}
        tabIndex={effectiveInteractive ? 0 : undefined}
        aria-disabled={effectiveDisabled ? true : undefined}
        aria-selected={effectiveSelected ? true : undefined}
        {...props}
      >
        {/* Featured subtle gradient glow (Lime + Violet ambient illumination, max 15% opacity) */}
        {(isFeatured || featuredGradient) && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#AEF366]/10 via-transparent to-[#6139B3]/10"
          />
        )}
        <div className={`relative z-10 flex flex-col w-full ${equalHeight ? 'flex-1 h-full' : ''}`}>{children}</div>
      </div>
    </CardContext.Provider>
  );
};

// --------------------------------------------------
// 03 · REUSABLE ICON + MULTILINE TEXT COMPOSITION
// --------------------------------------------------
export interface IconTextCompositionProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  iconSize?: 20 | 24;
  iconPlacement?: 'auto' | 'side' | 'stacked';
  titleLines?: number;
  className?: string;
  surfaceContext?: SurfaceContext;
}

/**
 * Adaptive icon placement hook:
 * - 1-2 line titles: Icon sits to the left of the title, aligning to the top of the first line.
 * - 3+ line titles: Icon moves ABOVE the title so the title can reclaim 100% full content width.
 */
export function useAdaptiveIconPlacement(
  title: React.ReactNode,
  iconPlacement: 'auto' | 'side' | 'stacked' = 'auto',
  titleLines?: number
) {
  const titleRef = React.useRef<HTMLElement | null>(null);
  const [isStacked, setIsStacked] = React.useState<boolean>(() => {
    if (iconPlacement === 'stacked') return true;
    if (iconPlacement === 'side') return false;
    if (titleLines !== undefined) return titleLines >= 3;
    if (typeof title === 'string') return title.length > 50;
    return false;
  });

  React.useLayoutEffect(() => {
    if (iconPlacement === 'stacked') {
      setIsStacked(true);
      return;
    }
    if (iconPlacement === 'side') {
      setIsStacked(false);
      return;
    }
    if (titleLines !== undefined) {
      setIsStacked(titleLines >= 3);
      return;
    }

    const el = titleRef.current;
    if (!el) return;

    const measure = () => {
      // 1 line is ~22px height, 2 lines is ~44px, 3 lines is >= 54px
      const h = el.scrollHeight;
      if (h >= 54) {
        setIsStacked(true);
      } else if (h <= 46) {
        setIsStacked(false);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [iconPlacement, titleLines, title]);

  return { isStacked, titleRef };
}

export const IconTextComposition: React.FC<IconTextCompositionProps> = ({
  icon,
  title,
  description,
  iconSize = 20,
  iconPlacement = 'auto',
  titleLines,
  className = '',
  surfaceContext = 'light',
}) => {
  const isDark = surfaceContext === 'dark' || surfaceContext === 'featured';
  const titleColor = isDark ? 'text-white' : 'text-[#171717]';
  const descColor = isDark ? 'text-white/60' : 'text-[#8A8A88]';

  const { isStacked, titleRef } = useAdaptiveIconPlacement(title, iconPlacement, titleLines);

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {isStacked ? (
        /* FOR 3+ LINE TITLES: Icon moves ABOVE the title, title reclaims 100% full width */
        <div className="space-y-2 w-full">
          <span
            style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            className="inline-flex items-center justify-center text-inherit shrink-0"
          >
            {icon}
          </span>
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            style={{ fontFamily: 'WPP, sans-serif', fontSize: '16px', lineHeight: '22px', fontWeight: 500 }}
            className={`tracking-tight break-words w-full ${titleColor}`}
          >
            {title}
          </div>
        </div>
      ) : (
        /* FOR 1-2 LINE TITLES: Icon remains to the left, aligned to line 1 */
        <div className="flex items-start gap-2.5 w-full">
          <span
            style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            className="shrink-0 mt-0.5 inline-flex items-center justify-center text-inherit"
          >
            {icon}
          </span>
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            style={{ fontFamily: 'WPP, sans-serif', fontSize: '16px', lineHeight: '22px', fontWeight: 500 }}
            className={`tracking-tight break-words flex-1 min-w-0 ${titleColor}`}
          >
            {title}
          </div>
        </div>
      )}

      {/* Description: full Card content width (always starts at standard boundary) */}
      {description && (
        <p
          style={{ fontFamily: 'WPP, sans-serif', fontSize: '13px', lineHeight: '18px', fontWeight: 400 }}
          className={`${descColor} leading-relaxed break-words w-full`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

// --------------------------------------------------
// 01 & 13 · CARD HEADER — ADAPTIVE FULL-WIDTH ARCHITECTURE
// --------------------------------------------------
export interface CardHeaderProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  titleLines?: number;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  iconPlacement?: 'auto' | 'side' | 'stacked';
  status?: React.ReactNode;
  action?: React.ReactNode;
  tagPosition?: 'auto' | 'left' | 'right';
  surfaceContext?: SurfaceContext;
  className?: string;
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  eyebrow,
  title,
  titleLines,
  description,
  icon,
  iconPlacement = 'auto',
  status,
  action,
  tagPosition = 'auto',
  surfaceContext = 'light',
  className = '',
  children,
}) => {
  const isDark = surfaceContext === 'dark' || surfaceContext === 'featured';
  const titleColor = isDark ? 'text-white' : 'text-[#171717]';
  const descColor = isDark ? 'text-white/60' : 'text-[#8A8A88]';
  const eyebrowColor = isDark ? 'text-[#AEF366]' : 'text-[#8A8A88]';
  const hasUtility = Boolean(status || action);
  const hasTopRow = Boolean(eyebrow || hasUtility);

  // Adaptive icon placement: 1-2 lines (beside) vs 3+ lines (above)
  const { isStacked: isIconStacked, titleRef } = useAdaptiveIconPlacement(
    title,
    iconPlacement,
    titleLines
  );

  // Tag / Status Positioning Rule:
  // For constrained and medium-width cards (tagPosition === 'left' or 'auto'),
  // Tags and Status elements are placed ABOVE the title and aligned to the LEFT edge of the Card content boundary.
  // Wide card format (tagPosition === 'right') allows utility to sit on the right only when ample room exists.
  const isLeftTag = tagPosition !== 'right';

  return (
    <div className={`space-y-2 pb-3 w-full ${className}`}>
      {/* Top Tag / Status / Eyebrow Row */}
      {hasTopRow && (
        isLeftTag ? (
          /* CONSTRAINED & MEDIUM CARDS: Tag / Status placed ABOVE title, aligned to LEFT edge */
          <div className="space-y-1.5 w-full">
            {status && (
              <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                <div className="flex items-center justify-start">
                  {status}
                </div>
                {/* If action exists and no eyebrow, action sits on the right of the top row */}
                {!eyebrow && action && (
                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    {action}
                  </div>
                )}
              </div>
            )}
            {eyebrow && (
              <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                <div
                  style={{ fontFamily: 'WPP, sans-serif', fontSize: '11px', lineHeight: '14px', fontWeight: 600 }}
                  className={`uppercase tracking-wider font-mono ${eyebrowColor} min-w-0`}
                >
                  {eyebrow}
                </div>
                {action && (
                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    {action}
                  </div>
                )}
              </div>
            )}
            {!status && !eyebrow && action && (
              <div className="flex items-center justify-end w-full">
                {action}
              </div>
            )}
          </div>
        ) : (
          /* WIDE CARD FORMAT ONLY: Eyebrow on left, Utility Zone (Status / Action) on right */
          <div className="flex flex-wrap items-center justify-between gap-2 w-full">
            {eyebrow ? (
              <div
                style={{ fontFamily: 'WPP, sans-serif', fontSize: '11px', lineHeight: '14px', fontWeight: 600 }}
                className={`uppercase tracking-wider font-mono ${eyebrowColor} min-w-0`}
              >
                {eyebrow}
              </div>
            ) : (
              <div />
            )}

            {hasUtility && (
              <div className="flex flex-wrap items-center gap-2 shrink-0 ml-auto">
                {status}
                {action}
              </div>
            )}
          </div>
        )
      )}

      {/* Title block: Full Card Content Width with Adaptive Local Icon Composition */}
      {title && (
        <div className="w-full">
          {icon ? (
            isIconStacked ? (
              /* FOR 3+ LINE TITLES: Icon moves ABOVE the title, title reclaims 100% full content width */
              <div className="space-y-2 w-full">
                <span
                  style={{ width: '20px', height: '20px' }}
                  className="inline-flex items-center justify-center text-inherit shrink-0"
                >
                  {icon}
                </span>
                <h3
                  ref={titleRef as React.RefObject<HTMLHeadingElement>}
                  style={{ fontFamily: 'WPP, sans-serif', fontSize: '16px', lineHeight: '22px', fontWeight: 500 }}
                  className={`tracking-tight break-words w-full ${titleColor}`}
                >
                  {title}
                </h3>
              </div>
            ) : (
              /* FOR 1-2 LINE TITLES: Icon remains to the left, aligned to line 1 */
              <div className="flex items-start gap-2.5 w-full">
                <span
                  style={{ width: '20px', height: '20px' }}
                  className="shrink-0 mt-0.5 inline-flex items-center justify-center text-inherit"
                >
                  {icon}
                </span>
                <h3
                  ref={titleRef as React.RefObject<HTMLHeadingElement>}
                  style={{ fontFamily: 'WPP, sans-serif', fontSize: '16px', lineHeight: '22px', fontWeight: 500 }}
                  className={`tracking-tight break-words flex-1 min-w-0 ${titleColor}`}
                >
                  {title}
                </h3>
              </div>
            )
          ) : (
            <h3
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              style={{ fontFamily: 'WPP, sans-serif', fontSize: '16px', lineHeight: '22px', fontWeight: 500 }}
              className={`tracking-tight break-words w-full ${titleColor}`}
            >
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Description: ALWAYS Full Card Content Width */}
      {description && (
        <p
          style={{ fontFamily: 'WPP, sans-serif', fontSize: '13px', lineHeight: '18px', fontWeight: 400 }}
          className={`${descColor} leading-relaxed break-words w-full`}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  );
};

// --------------------------------------------------
// CARD CONTENT (REQUIRED BODY)
// --------------------------------------------------
export interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className = '', children }) => {
  const { equalHeight } = useCardContext();
  return <div className={`min-w-0 w-full ${equalHeight ? 'flex-1' : ''} ${className}`}>{children}</div>;
};

// --------------------------------------------------
// CARD MEDIA (CONTAINER FOR IMAGE, VIDEO & CAROUSEL)
// --------------------------------------------------
export type MediaRatio = '16:9' | '4:3' | '1:1' | '3:4' | '9:16';
export type MediaPlacement = 'standard' | 'full-bleed' | 'overlay-content';
export type MediaTreatment = 'standard' | 'full-bleed' | 'overlay-content';
export type MediaObjectFit = 'cover' | 'contain';

/**
 * ====================================================================
 * APPROVED MEDIA TREATMENT SYSTEM RULE:
 * 
 * LANDSCAPE AND SQUARE MEDIA:
 * 16:9 -> Standard Media by default
 * 4:3  -> Standard Media by default
 * 1:1  -> Standard Media by default
 * 
 * PORTRAIT AND VERTICAL MEDIA:
 * 3:4  -> Overlay Content by default
 * 9:16 -> Overlay Content by default
 * ====================================================================
 */
export const getDefaultMediaTreatment = (ratio: MediaRatio): MediaTreatment => {
  if (ratio === '3:4' || ratio === '9:16') {
    return 'overlay-content';
  }
  return 'standard';
};

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: MediaRatio;
  placement?: MediaPlacement;
  treatment?: MediaTreatment;
  objectFit?: MediaObjectFit;
  overlay?: React.ReactNode;
  alt?: string;
  src?: string;
  className?: string;
  children?: React.ReactNode;
}

export const CardMedia: React.FC<CardMediaProps> = ({
  ratio = '16:9',
  placement,
  treatment,
  objectFit = 'cover',
  overlay,
  src,
  alt = 'Media creative asset',
  className = '',
  children,
  ...props
}) => {
  const activeTreatment = placement || treatment || getDefaultMediaTreatment(ratio);

  const ratioClasses: Record<MediaRatio, string> = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:4': 'aspect-[3/4]',
    '9:16': 'aspect-[9/16]',
  };

  const ratioClass = ratioClasses[ratio] || 'aspect-[16/9]';
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

  // Standard placement: sits inside card padding with subtle contained framing
  // Full-bleed placement: touches top, left, and right boundaries, conforming to the Card's outer radius
  // Overlay-content placement: full frame media with integrated overlay content inside the media container
  const placementClasses =
    activeTreatment === 'standard'
      ? 'rounded-[8px] overflow-hidden mb-3 border border-black/10 dark:border-white/10'
      : 'w-full overflow-hidden';

  return (
    <div
      className={`relative w-full ${ratioClass} bg-[#202022] ${placementClasses} ${className}`}
      {...props}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${fitClass}`}
        />
      )}
      {children}
      {overlay && (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-3">
          <div className="pointer-events-auto h-full w-full flex flex-col justify-between">{overlay}</div>
        </div>
      )}
    </div>
  );
};

// --------------------------------------------------
// CARD OVERLAY CONTENT (REUSABLE MEDIA TREATMENT LAYER)
// --------------------------------------------------
export interface CardOverlayContentProps {
  gradient?: boolean;
  gradientClass?: string;
  padding?: CardPadding;
  className?: string;
  children: React.ReactNode;
}

export const CardOverlayContent: React.FC<CardOverlayContentProps> = ({
  gradient = true,
  gradientClass = 'bg-gradient-to-t from-black/90 via-black/50 to-transparent',
  padding = 'standard',
  className = '',
  children,
}) => {
  const paddingClass =
    padding === 'compact'
      ? 'p-4'
      : padding === 'spacious'
      ? 'p-8'
      : 'p-6';

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end">
      {gradient && <div className={`absolute inset-0 pointer-events-none ${gradientClass}`} />}
      <div className={`relative z-20 pointer-events-auto w-full ${paddingClass} ${className}`}>
        {children}
      </div>
    </div>
  );
};

// --------------------------------------------------
// 02 & 14 · CARD FOOTER — NATURAL FLOW (DEFAULT) / ANCHORED VIA MT-AUTO (EQUAL-HEIGHT)
// --------------------------------------------------
export interface CardFooterProps {
  metadata?: React.ReactNode;
  timestamp?: React.ReactNode;
  source?: React.ReactNode;
  cta?: React.ReactNode;
  action?: React.ReactNode;
  borderTop?: boolean;
  alignBottom?: boolean;
  surfaceContext?: SurfaceContext;
  className?: string;
  children?: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  metadata,
  timestamp,
  source,
  cta,
  action,
  borderTop = false,
  alignBottom,
  surfaceContext: surfaceContextProp,
  className = '',
  children,
}) => {
  const context = useCardContext();
  const surfaceContext = surfaceContextProp || context.surfaceContext || 'light';
  const shouldAlignBottom = alignBottom !== undefined ? alignBottom : context.equalHeight;

  const isDark = surfaceContext === 'dark' || surfaceContext === 'featured';
  const metaColor = isDark ? 'text-white/50' : 'text-[#8A8A88]';
  const borderClass = borderTop
    ? isDark
      ? 'border-t border-white/10 pt-3 mt-4'
      : 'border-t border-[#E6E6E5] pt-3 mt-4'
    : 'pt-3 mt-2';

  const marginClass = shouldAlignBottom ? 'mt-auto' : '';

  return (
    <div
      className={`${marginClass} flex flex-wrap items-center justify-between gap-3 text-xs w-full ${borderClass} ${className}`}
    >
      <div className={`flex flex-wrap items-center gap-3 font-mono text-[11px] ${metaColor}`}>
        {timestamp && <span>{timestamp}</span>}
        {source && <span>Source: {source}</span>}
        {metadata}
      </div>

      {(cta || action) && (
        <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
          {action}
          {cta}
        </div>
      )}
      {children}
    </div>
  );
};

// --------------------------------------------------
// 07 · CARD SKELETON (LOADING CONTENT CONDITION)
// --------------------------------------------------
export interface CardSkeletonProps {
  hasMedia?: boolean;
  mediaRatio?: MediaRatio;
  hasMetric?: boolean;
  hasFooter?: boolean;
  surfaceContext?: SurfaceContext;
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  hasMedia = false,
  mediaRatio = '16:9',
  hasMetric = false,
  hasFooter = true,
  surfaceContext = 'light',
  className = '',
}) => {
  const isDark = surfaceContext === 'dark' || surfaceContext === 'featured';
  const shimmerBase = isDark ? 'bg-white/10' : 'bg-black/10';
  const shimmerHighlight = isDark ? 'bg-white/15' : 'bg-black/15';

  const ratioClasses: Record<MediaRatio, string> = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:4': 'aspect-[3/4]',
    '9:16': 'aspect-[9/16]',
  };

  return (
    <div className={`space-y-4 w-full animate-pulse ${className}`} aria-busy="true" aria-label="Loading card content">
      {/* Stable Media Placeholder if media card */}
      {hasMedia && (
        <div
          className={`w-full ${ratioClasses[mediaRatio] || 'aspect-[16/9]'} rounded-[8px] ${shimmerBase} mb-3 flex items-center justify-center`}
        >
          <div className={`w-8 h-8 rounded-full ${shimmerHighlight} opacity-50`} />
        </div>
      )}

      {/* Header skeleton: Eyebrow + Title */}
      <div className="space-y-2">
        <div className={`h-3 w-24 rounded-[4px] ${shimmerBase}`} />
        <div className={`h-5 w-3/4 rounded-[4px] ${shimmerHighlight}`} />
      </div>

      {/* Metric skeleton if metric card */}
      {hasMetric && (
        <div className="space-y-1 py-1">
          <div className={`h-8 w-32 rounded-[6px] ${shimmerHighlight}`} />
          <div className={`h-3 w-20 rounded-[4px] ${shimmerBase}`} />
        </div>
      )}

      {/* Body lines */}
      <div className="space-y-2 pt-1">
        <div className={`h-3.5 w-full rounded-[4px] ${shimmerBase}`} />
        <div className={`h-3.5 w-4/5 rounded-[4px] ${shimmerBase}`} />
      </div>

      {/* Footer skeleton */}
      {hasFooter && (
        <div className={`pt-3 border-t ${isDark ? 'border-white/10' : 'border-[#E6E6E5]'} flex items-center justify-between`}>
          <div className={`h-3 w-28 rounded-[4px] ${shimmerBase}`} />
          <div className={`h-6 w-16 rounded-[4px] ${shimmerBase}`} />
        </div>
      )}
    </div>
  );
};

// --------------------------------------------------
// 08 · CARD ERROR STATE (LOCALIZED SEMANTIC FAILURE)
// --------------------------------------------------
export interface CardErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  surfaceContext?: SurfaceContext;
  className?: string;
}

export const CardErrorState: React.FC<CardErrorStateProps> = ({
  title = 'Unable to load creative analysis',
  message = 'Failed to connect to the attribution telemetry engine. Previous snapshot cached.',
  onRetry,
  surfaceContext = 'light',
  className = '',
}) => {
  const isDark = surfaceContext === 'dark' || surfaceContext === 'featured';

  return (
    <div className={`space-y-3 py-2 w-full ${className}`} role="alert">
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-[6px] bg-[#E5484D]/15 text-[#E5484D] flex items-center justify-center shrink-0 mt-0.5 border border-[#E5484D]/30">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          <h4
            style={{ fontFamily: 'WPP, sans-serif', fontSize: '14px', lineHeight: '18px', fontWeight: 600 }}
            className={isDark ? 'text-white' : 'text-[#171717]'}
          >
            {title}
          </h4>
          <p
            style={{ fontFamily: 'WPP, sans-serif', fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}
            className={isDark ? 'text-white/70' : 'text-[#454544]'}
          >
            {message}
          </p>
        </div>
      </div>

      {onRetry && (
        <div className="pt-2 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            surfaceContext={surfaceContext}
            leadingIcon={<RotateCw className="w-3.5 h-3.5" />}
            onClick={onRetry}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

// --------------------------------------------------
// 09 · CARD EMPTY STATE (INTENTIONAL ABSENCE & ACTION)
// --------------------------------------------------
export interface CardEmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  surfaceContext?: SurfaceContext;
  className?: string;
}

export const CardEmptyState: React.FC<CardEmptyStateProps> = ({
  title = 'No creative assets available',
  message = 'Upload or connect an ad server flight stream to begin continuous intelligence analysis.',
  actionLabel = 'Add Creative',
  onAction,
  surfaceContext = 'light',
  className = '',
}) => {
  const isDark = surfaceContext === 'dark' || surfaceContext === 'featured';

  return (
    <div className={`space-y-3 py-2 text-center w-full ${className}`}>
      <div className="w-10 h-10 mx-auto rounded-[8px] bg-black/5 dark:bg-white/10 flex items-center justify-center text-inherit opacity-60">
        <Inbox className="w-5 h-5 stroke-1" />
      </div>
      <div className="space-y-1 max-w-xs mx-auto">
        <h4
          style={{ fontFamily: 'WPP, sans-serif', fontSize: '14px', lineHeight: '18px', fontWeight: 600 }}
          className={isDark ? 'text-white' : 'text-[#171717]'}
        >
          {title}
        </h4>
        <p
          style={{ fontFamily: 'WPP, sans-serif', fontSize: '12px', lineHeight: '16px', fontWeight: 400 }}
          className={isDark ? 'text-white/70' : 'text-[#454544]'}
        >
          {message}
        </p>
      </div>

      {actionLabel && (
        <div className="pt-1 flex justify-center">
          <Button
            variant="primary"
            size="sm"
            surfaceContext={surfaceContext}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

// --------------------------------------------------
// 10 · CARD EXPANDABLE PATTERN (BEHAVIOR & COMPOSITION)
// "Expandable Cards reveal secondary information without changing the Card's fundamental architecture."
// --------------------------------------------------
export interface CardExpandTriggerProps {
  expanded: boolean;
  onToggle: () => void;
  variant?: 'chevron' | 'plus-minus' | 'text';
  label?: string;
  expandedLabel?: string;
  surfaceContext?: SurfaceContext;
  className?: string;
  controlsId?: string;
  id?: string;
  'aria-label'?: string;
}

export const CardExpandTrigger: React.FC<CardExpandTriggerProps> = ({
  expanded,
  onToggle,
  variant = 'chevron',
  label = 'Expand details',
  expandedLabel = 'Collapse details',
  surfaceContext: propSurfaceContext,
  className = '',
  controlsId,
  id,
  'aria-label': customAriaLabel,
}) => {
  const context = useCardContext();
  const surfaceContext = propSurfaceContext || context.surfaceContext || 'light';
  const isDark = surfaceContext === 'dark' || surfaceContext === 'featured';

  const baseBtnClasses =
    'inline-flex items-center justify-center transition-colors rounded-[6px] outline-none focus-visible:ring-2 focus-visible:ring-[#5967F6] dark:focus-visible:ring-[#7D72E8] select-none';

  const accessibleLabel =
    customAriaLabel || (expanded ? expandedLabel : label);

  if (variant === 'text') {
    return (
      <button
        type="button"
        id={id}
        aria-controls={controlsId}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-expanded={expanded}
        aria-label={accessibleLabel}
        className={`${baseBtnClasses} text-xs font-mono font-medium gap-1.5 py-1 px-2 ${
          isDark
            ? 'text-[#AEF366] hover:bg-white/10 active:bg-white/15'
            : 'text-[#171717] hover:bg-[#F2F2F1] active:bg-[#E6E6E5]'
        } ${className}`}
      >
        <span>{expanded ? expandedLabel : label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            expanded ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
    );
  }

  if (variant === 'plus-minus') {
    return (
      <button
        type="button"
        id={id}
        aria-controls={controlsId}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-expanded={expanded}
        aria-label={accessibleLabel}
        className={`${baseBtnClasses} w-7 h-7 ${
          isDark
            ? 'text-white/80 hover:text-white hover:bg-white/10 active:bg-white/15 border border-white/15'
            : 'text-[#171717] hover:bg-[#F2F2F1] active:bg-[#E6E6E5] border border-[#E6E6E5]'
        } ${className}`}
      >
        {expanded ? (
          <Minus aria-hidden="true" className="w-3.5 h-3.5 transition-transform duration-200" />
        ) : (
          <Plus aria-hidden="true" className="w-3.5 h-3.5 transition-transform duration-200" />
        )}
      </button>
    );
  }

  // Default: Chevron Icon Trigger
  return (
    <button
      type="button"
      id={id}
      aria-controls={controlsId}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-expanded={expanded}
      aria-label={accessibleLabel}
      className={`${baseBtnClasses} w-7 h-7 ${
        isDark
          ? 'text-white/80 hover:text-white hover:bg-white/10 active:bg-white/15'
          : 'text-[#454544] hover:text-[#171717] hover:bg-[#F2F2F1] active:bg-[#E6E6E5]'
      } ${className}`}
    >
      <ChevronDown
        aria-hidden="true"
        className={`w-4 h-4 transition-transform duration-200 ${
          expanded ? 'rotate-180 text-inherit' : 'rotate-0 text-inherit'
        }`}
      />
    </button>
  );
};

export interface CardExpandableContentProps {
  expanded: boolean;
  borderTop?: boolean;
  surfaceContext?: SurfaceContext;
  className?: string;
  id?: string;
  labelledBy?: string;
  children: React.ReactNode;
}

export const CardExpandableContent: React.FC<CardExpandableContentProps> = ({
  expanded,
  borderTop = true,
  surfaceContext: propSurfaceContext,
  className = '',
  id,
  labelledBy,
  children,
}) => {
  const context = useCardContext();
  const surfaceContext = propSurfaceContext || context.surfaceContext || 'light';
  const isDark = surfaceContext === 'dark' || surfaceContext === 'featured';

  const borderClass = borderTop
    ? isDark
      ? 'border-t border-white/10 pt-4 mt-3'
      : 'border-t border-[#E6E6E5] pt-4 mt-3'
    : 'pt-2';

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!expanded}
      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out w-full ${
        expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
      }`}
    >
      <div className="overflow-hidden min-h-0 w-full">
        <div className={`w-full ${borderClass} ${className}`}>{children}</div>
      </div>
    </div>
  );
};

