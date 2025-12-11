import * as stylex from '@stylexjs/stylex';

// Color tokens (12 tokens)
export const colors = stylex.defineVars({
  primary: '#8b4513',
  primaryDark: '#6b3410',
  primaryLight: '#f4ece4',
  accent: '#d2691e',
  accentLight: '#fef3e8',
  bgPrimary: '#fafafa',
  bgSecondary: '#ffffff',
  textPrimary: '#2c2c2c',
  textSecondary: '#666666',
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  borderDark: '#c0c0c0',
});

// Spacing tokens (5 tokens)
export const spacing = stylex.defineVars({
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
});

// Border radius tokens (3 tokens)
export const radius = stylex.defineVars({
  sm: '4px',
  md: '8px',
  lg: '12px',
});

// Responsive breakpoints
export const breakpoints = {
  mobile: '@media (max-width: 768px)',
} as const;
