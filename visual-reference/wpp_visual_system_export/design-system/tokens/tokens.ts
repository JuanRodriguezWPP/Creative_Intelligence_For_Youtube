export type ColorFamilyType = 'foundation' | 'brand' | 'supporting' | 'semantic';

export interface ColorToken {
  id: string;
  name: string;
  tokenName: string; // e.g. "neutral.500", "brand.lime.500", "blue.500", "success.500", "brand.navy.500"
  cssVar: string;    // e.g. "--color-neutral-500", "--color-brand-lime-500", "--color-brand-navy-500"
  family: ColorFamilyType;
  subfamily?: 'neutral' | 'navy' | 'lime' | 'blue' | 'violet' | 'success' | 'warning' | 'error' | 'info';
  step?: string | number; // e.g., '0', '50', '100', '200', '300', '400', '500', '600', '700', '900', '1000'
  hex: string;
  rgb: string;
  role: string;
  usageRule?: string;
  isPrimaryAccent?: boolean;
  reusedFrom?: string; // e.g., "blue.500" for info tokens
  lightContrastRatio: number; // against #FFFFFF (neutral.0)
  darkContrastRatio: number;  // against #000000 (neutral.1000)
  accessibleTextOnLight: boolean; // >= 4.5:1
  accessibleTextOnDark: boolean;  // >= 4.5:1
  status: 'approved' | 'calibration';
}

export type SurfaceContextMode = 'light' | 'dark' | 'featured';

export interface SystemSection {
  id: string;
  number: string;
  title: string;
  category: 'Foundation' | 'Design Tokens' | 'Components' | 'Patterns' | 'Domain';
  status: 'approved' | 'active' | 'upcoming' | 'planned';
  description: string;
}
