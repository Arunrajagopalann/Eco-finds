// Responsive Design System
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1200px'
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  largeDesktop: `@media (min-width: ${breakpoints.desktop})`,
  mobileAndTablet: `@media (max-width: ${breakpoints.tablet})`,
  tabletAndUp: `@media (min-width: ${breakpoints.mobile})`,
  desktopAndUp: `@media (min-width: ${breakpoints.tablet})`
};

export const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  breakpoints,
  mediaQueries
};

// Responsive utility functions
export const getResponsiveValue = (mobile, tablet, desktop) => ({
  [theme.mediaQueries.mobile]: mobile,
  [theme.mediaQueries.tablet]: tablet,
  [theme.mediaQueries.desktopAndUp]: desktop
});

export const getResponsiveSpacing = (mobile, tablet, desktop) => ({
  padding: mobile,
  [theme.mediaQueries.tabletAndUp]: {
    padding: tablet
  },
  [theme.mediaQueries.desktopAndUp]: {
    padding: desktop
  }
});

export const getResponsiveGrid = (mobileCols, tabletCols, desktopCols) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${mobileCols}, 1fr)`,
  gap: theme.spacing.md,
  [theme.mediaQueries.tabletAndUp]: {
    gridTemplateColumns: `repeat(${tabletCols}, 1fr)`,
    gap: theme.spacing.lg
  },
  [theme.mediaQueries.desktopAndUp]: {
    gridTemplateColumns: `repeat(${desktopCols}, 1fr)`,
    gap: theme.spacing.xl
  }
});

export const getResponsiveFlex = (mobile, tablet, desktop) => ({
  display: 'flex',
  flexDirection: mobile,
  [theme.mediaQueries.tabletAndUp]: {
    flexDirection: tablet
  },
  [theme.mediaQueries.desktopAndUp]: {
    flexDirection: desktop
  }
});