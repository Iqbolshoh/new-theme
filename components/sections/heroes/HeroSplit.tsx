import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface HeroSplitProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    image: string;
    features: string[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
}

const HeroSplit: React.FC<HeroSplitProps> = ({ content, isEditing, onChange }) => {
  const { currentColorTheme, currentFontTheme } = useTheme();

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...content.features];
    updatedFeatures[index] = value;
    handleChange('features', updatedFeatures);
  };

  return (
    <section 
      className="py-20"
      style={{ 
        backgroundColor: currentColorTheme.colors.background,
        fontFamily: currentFontTheme.fonts.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                  style={{ 
                    color: currentColorTheme.colors.primary,
                    borderColor: `${currentColorTheme.colors.primary}50`,
                    fontFamily: currentFontTheme.fonts.primary,
                    fontSize: currentFontTheme.typography.h2,
                    fontWeight: currentFontTheme.typography.headingWeight,
                    borderRadius: currentFontTheme.borderRadius.lg
                  }}
                  placeholder="Enter title"
                />
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                  style={{ 
                    color: currentColorTheme.colors.textSecondary,
                    borderColor: `${currentColorTheme.colors.primary}50`,
                    fontFamily: currentFontTheme.fonts.secondary,
                    fontSize: currentFontTheme.typography.subtitle,
                    fontWeight: currentFontTheme.typography.bodyWeight,
                    borderRadius: currentFontTheme.borderRadius.lg
                  }}
                  placeholder="Enter subtitle"
                />
                <textarea
                  value={content.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full resize-none"
                  style={{ 
                    color: currentColorTheme.colors.textSecondary,
                    borderColor: `${currentColorTheme.colors.primary}50`,
                    fontFamily: currentFontTheme.fonts.secondary,
                    fontSize: currentFontTheme.typography.body,
                    fontWeight: currentFontTheme.typography.bodyWeight,
                    borderRadius: currentFontTheme.borderRadius.lg
                  }}
                  placeholder="Enter description"
                  rows={3}
                />
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: currentColorTheme.colors.success,
                        borderRadius: currentFontTheme.borderRadius.full
                      }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 bg-transparent border-2 border-dashed rounded-lg p-1"
                      style={{ 
                        color: currentColorTheme.colors.text,
                        borderColor: `${currentColorTheme.colors.primary}50`,
                        fontFamily: currentFontTheme.fonts.secondary,
                        fontSize: currentFontTheme.typography.body,
                        borderRadius: currentFontTheme.borderRadius.md
                      }}
                      placeholder="Feature"
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6"
                  style={{ 
                    color: currentColorTheme.colors.primary,
                    fontFamily: currentFontTheme.fonts.primary,
                    fontSize: currentFontTheme.typography.h2,
                    fontWeight: currentFontTheme.typography.headingWeight,
                    lineHeight: currentFontTheme.typography.headingLineHeight
                  }}
                >
                  {content.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-4"
                  style={{ 
                    color: currentColorTheme.colors.textSecondary,
                    fontFamily: currentFontTheme.fonts.secondary,
                    fontSize: currentFontTheme.typography.subtitle,
                    fontWeight: currentFontTheme.typography.bodyWeight,
                    lineHeight: currentFontTheme.typography.bodyLineHeight
                  }}
                >
                  {content.subtitle}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-6"
                  style={{ 
                    color: currentColorTheme.colors.textSecondary,
                    fontFamily: currentFontTheme.fonts.secondary,
                    fontSize: currentFontTheme.typography.body,
                    fontWeight: currentFontTheme.typography.bodyWeight,
                    lineHeight: currentFontTheme.typography.bodyLineHeight
                  }}
                >
                  {content.description}
                </motion.p>
                {content.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: currentColorTheme.colors.success,
                        borderRadius: currentFontTheme.borderRadius.full
                      }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span 
                      style={{ 
                        color: currentColorTheme.colors.text,
                        fontFamily: currentFontTheme.fonts.secondary,
                        fontSize: currentFontTheme.typography.body,
                        fontWeight: currentFontTheme.typography.bodyWeight
                      }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-8"
                >
                  <a 
                    href={content.ctaLink}
                    className="inline-block px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
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
                </motion.div>
              </>
            )}
          </div>
          
          <div className="relative">
            {isEditing ? (
              <input
                type="url"
                value={content.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full h-96 border-2 border-dashed p-4 text-center"
                style={{ 
                  borderColor: currentColorTheme.colors.border,
                  backgroundColor: currentColorTheme.colors.surface,
                  color: currentColorTheme.colors.textSecondary,
                  fontFamily: currentFontTheme.fonts.secondary,
                  borderRadius: currentFontTheme.borderRadius.xl
                }}
                placeholder="Image URL"
              />
            ) : (
              <motion.img 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                src={content.image} 
                alt={content.title} 
                className="w-full"
                style={{ 
                  boxShadow: currentColorTheme.shadows.lg,
                  borderRadius: currentFontTheme.borderRadius.xl
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;