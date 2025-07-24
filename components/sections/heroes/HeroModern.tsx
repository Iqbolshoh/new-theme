import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface HeroModernProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    backgroundImage: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
}

const HeroModern: React.FC<HeroModernProps> = ({ content, isEditing, onChange }) => {
  const { currentColorTheme, currentFontTheme } = useTheme();

  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{ 
        backgroundImage: `url('${content.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: currentFontTheme.fonts.primary
      }}
    >
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      ></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        {isEditing ? (
          <>
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-4xl md:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full text-white placeholder-white/70"
              style={{ 
                fontFamily: currentFontTheme.fonts.primary,
                fontSize: currentFontTheme.typography.h1,
                fontWeight: currentFontTheme.typography.headingWeight,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: currentFontTheme.borderRadius.lg
              }}
              placeholder="Enter title"
            />
            <input
              type="text"
              value={content.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="text-xl md:text-2xl mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full text-white placeholder-white/70"
              style={{ 
                fontFamily: currentFontTheme.fonts.secondary,
                fontSize: currentFontTheme.typography.subtitle,
                fontWeight: currentFontTheme.typography.bodyWeight,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: currentFontTheme.borderRadius.lg
              }}
              placeholder="Enter subtitle"
            />
            <textarea
              value={content.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="text-lg mb-8 max-w-2xl mx-auto bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full text-white placeholder-white/70 resize-none"
              style={{ 
                fontFamily: currentFontTheme.fonts.secondary,
                fontSize: currentFontTheme.typography.body,
                fontWeight: currentFontTheme.typography.bodyWeight,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: currentFontTheme.borderRadius.lg
              }}
              placeholder="Enter description"
              rows={3}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="text"
                value={content.ctaText}
                onChange={(e) => handleChange('ctaText', e.target.value)}
                className="px-6 py-3 rounded-lg border-2 border-dashed placeholder-white/70 font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${currentColorTheme.colors.primary}, ${currentColorTheme.colors.secondary})`,
                  color: '#ffffff',
                  fontFamily: currentFontTheme.fonts.secondary,
                  fontSize: currentFontTheme.typography.button,
                  fontWeight: currentFontTheme.typography.buttonWeight,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: currentFontTheme.borderRadius.md,
                  boxShadow: currentColorTheme.shadows.md
                }}
                placeholder="CTA Text"
              />
              {content.secondaryCtaText && (
                <input
                  type="text"
                  value={content.secondaryCtaText}
                  onChange={(e) => handleChange('secondaryCtaText', e.target.value)}
                  className="px-6 py-3 border-2 text-white rounded-lg bg-transparent placeholder-white/70 font-semibold"
                  style={{ 
                    fontFamily: currentFontTheme.fonts.secondary,
                    fontSize: currentFontTheme.typography.button,
                    fontWeight: currentFontTheme.typography.buttonWeight,
                    borderColor: '#ffffff',
                    borderRadius: currentFontTheme.borderRadius.md
                  }}
                  placeholder="Secondary CTA"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bold mb-6"
              style={{ 
                fontFamily: currentFontTheme.fonts.primary,
                fontSize: currentFontTheme.typography.h1,
                fontWeight: currentFontTheme.typography.headingWeight,
                color: '#ffffff',
                lineHeight: currentFontTheme.typography.headingLineHeight
              }}
            >
              {content.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
              style={{ 
                fontFamily: currentFontTheme.fonts.secondary,
                fontSize: currentFontTheme.typography.subtitle,
                fontWeight: currentFontTheme.typography.bodyWeight,
                color: '#ffffff',
                lineHeight: currentFontTheme.typography.bodyLineHeight
              }}
            >
              {content.subtitle}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 max-w-2xl mx-auto"
              style={{ 
                fontFamily: currentFontTheme.fonts.secondary,
                fontSize: currentFontTheme.typography.body,
                fontWeight: currentFontTheme.typography.bodyWeight,
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: currentFontTheme.typography.bodyLineHeight
              }}
            >
              {content.description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href={content.ctaLink} 
                className="px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                style={{ 
                  background: `linear-gradient(135deg, ${currentColorTheme.colors.primary}, ${currentColorTheme.colors.secondary})`,
                  color: '#ffffff',
                  fontFamily: currentFontTheme.fonts.secondary,
                  fontSize: currentFontTheme.typography.button,
                  fontWeight: currentFontTheme.typography.buttonWeight,
                  borderRadius: currentFontTheme.borderRadius.md,
                  boxShadow: currentColorTheme.shadows.md,
                  textDecoration: 'none'
                }}
              >
                {content.ctaText}
              </a>
              {content.secondaryCtaText && (
                <a 
                  href="#" 
                  className="px-6 py-3 border-2 text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold"
                  style={{ 
                    fontFamily: currentFontTheme.fonts.secondary,
                    fontSize: currentFontTheme.typography.button,
                    fontWeight: currentFontTheme.typography.buttonWeight,
                    borderColor: '#ffffff',
                    borderRadius: currentFontTheme.borderRadius.md,
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = currentColorTheme.colors.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  {content.secondaryCtaText}
                </a>
              )}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroModern;