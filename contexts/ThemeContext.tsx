import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  currentColorTheme: ColorTheme;
  currentFontTheme: FontTheme;
  availableColorThemes: ColorTheme[];
  availableFontThemes: FontTheme[];
  updateColorTheme: (themeId: string) => void;
  updateFontTheme: (themeId: string) => void;
  getCSSVariables: () => Record<string, string>;
}

interface ColorTheme {
  id: string;
  name: string;
  category: 'modern' | 'classic' | 'minimal' | 'bold' | 'elegant';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    primary100: string;
    primary200: string;
    primary300: string;
    secondary100: string;
    secondary200: string;
    accent100: string;
    accent200: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface FontTheme {
  id: string;
  name: string;
  category: 'modern' | 'classic' | 'minimal' | 'creative' | 'professional';
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    body: string;
    small: string;
    button: string;
    subtitle: string;
    headingWeight: number;
    bodyWeight: number;
    buttonWeight: number;
    headingLineHeight: number;
    bodyLineHeight: number;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
}

// Color Theme Collections
const colorThemes: ColorTheme[] = [
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    category: 'modern',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#18181b',
      textSecondary: '#71717a',
      border: '#e4e4e7',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f0f9ff',
      primary200: '#e0f2fe',
      primary300: '#bae6fd',
      secondary100: '#cffafe',
      secondary200: '#a5f3fc',
      accent100: '#f3e8ff',
      accent200: '#e9d5ff',
    },
    shadows: {
      sm: '0 2px 8px rgba(14, 165, 233, 0.08)',
      md: '0 4px 16px rgba(14, 165, 233, 0.12)',
      lg: '0 8px 32px rgba(14, 165, 233, 0.16)',
      xl: '0 16px 64px rgba(14, 165, 233, 0.20)',
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    category: 'modern',
    colors: {
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#ecfdf5',
      primary200: '#d1fae5',
      primary300: '#a7f3d0',
      secondary100: '#f0fdfa',
      secondary200: '#ccfbf1',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    shadows: {
      sm: '0 2px 8px rgba(5, 150, 105, 0.08)',
      md: '0 4px 16px rgba(5, 150, 105, 0.12)',
      lg: '0 8px 32px rgba(5, 150, 105, 0.16)',
      xl: '0 16px 64px rgba(5, 150, 105, 0.20)',
    },
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    category: 'bold',
    colors: {
      primary: '#ea580c',
      secondary: '#dc2626',
      accent: '#7c3aed',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fff7ed',
      primary200: '#ffedd5',
      primary300: '#fed7aa',
      secondary100: '#fef2f2',
      secondary200: '#fecaca',
      accent100: '#f3e8ff',
      accent200: '#e9d5ff',
    },
    shadows: {
      sm: '0 2px 8px rgba(234, 88, 12, 0.08)',
      md: '0 4px 16px rgba(234, 88, 12, 0.12)',
      lg: '0 8px 32px rgba(234, 88, 12, 0.16)',
      xl: '0 16px 64px rgba(234, 88, 12, 0.20)',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    category: 'elegant',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a855f7',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f3e8ff',
      primary200: '#e9d5ff',
      primary300: '#d8b4fe',
      secondary100: '#faf5ff',
      secondary200: '#f3e8ff',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    shadows: {
      sm: '0 2px 8px rgba(139, 92, 246, 0.08)',
      md: '0 4px 16px rgba(139, 92, 246, 0.12)',
      lg: '0 8px 32px rgba(139, 92, 246, 0.16)',
      xl: '0 16px 64px rgba(139, 92, 246, 0.20)',
    },
  },
  {
    id: 'midnight-dark',
    name: 'Midnight Dark',
    category: 'elegant',
    colors: {
      primary: '#0ea5e9',
      secondary: '#ffffff',
      accent: '#d946ef',
      background: '#18181b',
      surface: '#27272a',
      text: '#ffffff',
      textSecondary: '#a1a1aa',
      border: '#3f3f46',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f0f9ff',
      primary200: '#e0f2fe',
      primary300: '#bae6fd',
      secondary100: '#fafafa',
      secondary200: '#f4f4f5',
      accent100: '#fdf4ff',
      accent200: '#fae8ff',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.3)',
      lg: '0 8px 32px rgba(0, 0, 0, 0.3)',
      xl: '0 16px 64px rgba(0, 0, 0, 0.3)',
    },
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    category: 'minimal',
    colors: {
      primary: '#000000',
      secondary: '#6b7280',
      accent: '#ef4444',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f3f4f6',
      primary200: '#e5e7eb',
      primary300: '#d1d5db',
      secondary100: '#f9fafb',
      secondary200: '#f3f4f6',
      accent100: '#fef2f2',
      accent200: '#fee2e2',
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.03)',
      md: '0 2px 4px rgba(0, 0, 0, 0.06)',
      lg: '0 4px 8px rgba(0, 0, 0, 0.08)',
      xl: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
  },
];

// Font Theme Collections
const fontThemes: FontTheme[] = [
  {
    id: 'modern-inter',
    name: 'Modern Inter',
    category: 'modern',
    fonts: {
      primary: 'Inter',
      secondary: 'Inter',
      accent: 'Inter',
    },
    typography: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.5rem',
      h4: '1.25rem',
      body: '1rem',
      small: '0.875rem',
      button: '1rem',
      subtitle: '1.25rem',
      headingWeight: 700,
      bodyWeight: 400,
      buttonWeight: 600,
      headingLineHeight: 1.2,
      bodyLineHeight: 1.6,
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
  },
  {
    id: 'elegant-playfair',
    name: 'Elegant Playfair',
    category: 'elegant',
    fonts: {
      primary: 'Playfair Display',
      secondary: 'Source Sans Pro',
      accent: 'Crimson Text',
    },
    typography: {
      h1: '3rem',
      h2: '2.25rem',
      h3: '1.75rem',
      h4: '1.5rem',
      body: '1.125rem',
      small: '1rem',
      button: '1.125rem',
      subtitle: '1.5rem',
      headingWeight: 700,
      bodyWeight: 400,
      buttonWeight: 600,
      headingLineHeight: 1.1,
      bodyLineHeight: 1.7,
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
  },
  {
    id: 'friendly-nunito',
    name: 'Friendly Nunito',
    category: 'modern',
    fonts: {
      primary: 'Nunito',
      secondary: 'Nunito Sans',
      accent: 'Comfortaa',
    },
    typography: {
      h1: '2.75rem',
      h2: '2.25rem',
      h3: '1.75rem',
      h4: '1.5rem',
      body: '1.125rem',
      small: '1rem',
      button: '1.125rem',
      subtitle: '1.375rem',
      headingWeight: 800,
      bodyWeight: 400,
      buttonWeight: 700,
      headingLineHeight: 1.15,
      bodyLineHeight: 1.65,
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
      full: '9999px',
    },
  },
  {
    id: 'professional-roboto',
    name: 'Professional Roboto',
    category: 'professional',
    fonts: {
      primary: 'Roboto',
      secondary: 'Open Sans',
      accent: 'Roboto Condensed',
    },
    typography: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.5rem',
      h4: '1.25rem',
      body: '1rem',
      small: '0.875rem',
      button: '1rem',
      subtitle: '1.25rem',
      headingWeight: 700,
      bodyWeight: 400,
      buttonWeight: 500,
      headingLineHeight: 1.25,
      bodyLineHeight: 1.6,
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
  },
  {
    id: 'creative-oswald',
    name: 'Creative Oswald',
    category: 'creative',
    fonts: {
      primary: 'Oswald',
      secondary: 'Lato',
      accent: 'Dancing Script',
    },
    typography: {
      h1: '3rem',
      h2: '2.5rem',
      h3: '2rem',
      h4: '1.75rem',
      body: '1.125rem',
      small: '1rem',
      button: '1.25rem',
      subtitle: '1.5rem',
      headingWeight: 600,
      bodyWeight: 400,
      buttonWeight: 600,
      headingLineHeight: 1.1,
      bodyLineHeight: 1.7,
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
  },
  {
    id: 'minimal-work-sans',
    name: 'Minimal Work Sans',
    category: 'minimal',
    fonts: {
      primary: 'Work Sans',
      secondary: 'Karla',
      accent: 'Space Mono',
    },
    typography: {
      h1: '2.25rem',
      h2: '1.875rem',
      h3: '1.5rem',
      h4: '1.25rem',
      body: '1rem',
      small: '0.875rem',
      button: '0.875rem',
      subtitle: '1.125rem',
      headingWeight: 600,
      bodyWeight: 400,
      buttonWeight: 500,
      headingLineHeight: 1.3,
      bodyLineHeight: 1.5,
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
  },
];

const defaultColorTheme = colorThemes[0];
const defaultFontTheme = fontThemes[0];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentColorTheme, setCurrentColorTheme] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem('selected_color_theme');
    return saved ? colorThemes.find(t => t.id === saved) || defaultColorTheme : defaultColorTheme;
  });

  const [currentFontTheme, setCurrentFontTheme] = useState<FontTheme>(() => {
    const saved = localStorage.getItem('selected_font_theme');
    return saved ? fontThemes.find(t => t.id === saved) || defaultFontTheme : defaultFontTheme;
  });

  // Apply CSS variables to root for WEBSITE theme only
  useEffect(() => {
    const root = document.documentElement;

    // Apply website colors (these change with color theme)
    Object.entries(currentColorTheme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--website-color-${cssVar}`, value);
    });

    // Apply website shadows
    Object.entries(currentColorTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--website-shadow-${key}`, value);
    });

    // Apply website fonts
    Object.entries(currentFontTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--website-font-${key}`, `'${value}', sans-serif`);
    });

    // Apply website typography
    Object.entries(currentFontTheme.typography).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--website-typography-${cssVar}`, value.toString());
    });

    // Apply website border radius
    Object.entries(currentFontTheme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--website-border-radius-${key}`, value);
    });

    // Load Google Fonts for current font theme
    const fontFamilies = Object.values(currentFontTheme.fonts);

    // Remove existing font link
    const existingLink = document.querySelector('link[data-website-fonts]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new font link
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?${fontFamilies.map(font =>
      `family=${font.replace(' ', '+')}:wght@300;400;500;600;700;800;900`
    ).join('&')}&display=swap`;
    link.rel = 'stylesheet';
    link.setAttribute('data-website-fonts', 'true');
    document.head.appendChild(link);

  }, [currentColorTheme, currentFontTheme]);

  const updateColorTheme = (themeId: string) => {
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentColorTheme(theme);
      localStorage.setItem('selected_color_theme', themeId);
    }
  };

  const updateFontTheme = (themeId: string) => {
    const theme = fontThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentFontTheme(theme);
      localStorage.setItem('selected_font_theme', themeId);
    }
  };

  // Helper function to get CSS custom properties for website
  const getCSSVariables = () => {
    return {
      // Colors
      '--website-color-primary': currentColorTheme.colors.primary,
      '--website-color-secondary': currentColorTheme.colors.secondary,
      '--website-color-accent': currentColorTheme.colors.accent,
      '--website-color-background': currentColorTheme.colors.background,
      '--website-color-surface': currentColorTheme.colors.surface,
      '--website-color-text': currentColorTheme.colors.text,
      '--website-color-text-secondary': currentColorTheme.colors.textSecondary,
      '--website-color-border': currentColorTheme.colors.border,
      '--website-color-success': currentColorTheme.colors.success,
      '--website-color-warning': currentColorTheme.colors.warning,
      '--website-color-error': currentColorTheme.colors.error,
      '--website-color-primary-100': currentColorTheme.colors.primary100,
      '--website-color-primary-200': currentColorTheme.colors.primary200,
      '--website-color-primary-300': currentColorTheme.colors.primary300,
      '--website-color-secondary-100': currentColorTheme.colors.secondary100,
      '--website-color-secondary-200': currentColorTheme.colors.secondary200,
      '--website-color-accent-100': currentColorTheme.colors.accent100,
      '--website-color-accent-200': currentColorTheme.colors.accent200,
      
      // Shadows
      '--website-shadow-sm': currentColorTheme.shadows.sm,
      '--website-shadow-md': currentColorTheme.shadows.md,
      '--website-shadow-lg': currentColorTheme.shadows.lg,
      '--website-shadow-xl': currentColorTheme.shadows.xl,
      
      // Fonts
      '--website-font-primary': `'${currentFontTheme.fonts.primary}', sans-serif`,
      '--website-font-secondary': `'${currentFontTheme.fonts.secondary}', sans-serif`,
      '--website-font-accent': `'${currentFontTheme.fonts.accent}', serif`,
      
      // Typography
      '--website-typography-h1': currentFontTheme.typography.h1,
      '--website-typography-h2': currentFontTheme.typography.h2,
      '--website-typography-h3': currentFontTheme.typography.h3,
      '--website-typography-h4': currentFontTheme.typography.h4,
      '--website-typography-body': currentFontTheme.typography.body,
      '--website-typography-small': currentFontTheme.typography.small,
      '--website-typography-button': currentFontTheme.typography.button,
      '--website-typography-subtitle': currentFontTheme.typography.subtitle,
      '--website-typography-heading-weight': currentFontTheme.typography.headingWeight.toString(),
      '--website-typography-body-weight': currentFontTheme.typography.bodyWeight.toString(),
      '--website-typography-button-weight': currentFontTheme.typography.buttonWeight.toString(),
      '--website-typography-heading-line-height': currentFontTheme.typography.headingLineHeight.toString(),
      '--website-typography-body-line-height': currentFontTheme.typography.bodyLineHeight.toString(),
      
      // Border Radius
      '--website-border-radius-sm': currentFontTheme.borderRadius.sm,
      '--website-border-radius-md': currentFontTheme.borderRadius.md,
      '--website-border-radius-lg': currentFontTheme.borderRadius.lg,
      '--website-border-radius-xl': currentFontTheme.borderRadius.xl,
      '--website-border-radius-full': currentFontTheme.borderRadius.full,
    };
  };

  return (
    <ThemeContext.Provider value={{
      currentColorTheme,
      currentFontTheme,
      availableColorThemes: colorThemes,
      availableFontThemes: fontThemes,
      updateColorTheme,
      updateFontTheme,
      getCSSVariables
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export types for use in other components
export type { ColorTheme, FontTheme };