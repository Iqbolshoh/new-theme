import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesListProps {
  content: {
    title: string;
    subtitle: string;
    features: Feature[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  onIconClick?: (field: string) => void;
}

const FeaturesList: React.FC<FeaturesListProps> = ({ content, isEditing, onChange, onIconClick }) => {
  const { currentColorTheme, currentFontTheme } = useTheme();

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...content.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    handleChange('features', updatedFeatures);
  };

  const addFeature = () => {
    const newFeature: Feature = {
      icon: 'Zap',
      title: 'New Feature',
      description: 'Feature description goes here.',
    };
    handleChange('features', [...content.features, newFeature]);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = content.features.filter((_, i) => i !== index);
    handleChange('features', updatedFeatures);
  };

  // Get icon component safely
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Zap;
  };

  return (
    <section 
      className="py-20"
      style={{ 
        backgroundColor: currentColorTheme.colors.surface,
        fontFamily: currentFontTheme.fonts.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
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
                className="bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-3xl mx-auto"
                style={{ 
                  color: currentColorTheme.colors.textSecondary,
                  borderColor: `${currentColorTheme.colors.primary}50`,
                  fontFamily: currentFontTheme.fonts.secondary,
                  fontSize: currentFontTheme.typography.body,
                  fontWeight: currentFontTheme.typography.bodyWeight,
                  borderRadius: currentFontTheme.borderRadius.lg
                }}
                placeholder="Enter subtitle"
              />
            </>
          ) : (
            <>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-4"
                style={{ 
                  color: currentColorTheme.colors.primary,
                  fontFamily: currentFontTheme.fonts.primary,
                  fontSize: currentFontTheme.typography.h2,
                  fontWeight: currentFontTheme.typography.headingWeight,
                  lineHeight: currentFontTheme.typography.headingLineHeight
                }}
              >
                {content.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
                style={{ 
                  color: currentColorTheme.colors.textSecondary,
                  fontFamily: currentFontTheme.fonts.secondary,
                  fontSize: currentFontTheme.typography.body,
                  fontWeight: currentFontTheme.typography.bodyWeight,
                  lineHeight: currentFontTheme.typography.bodyLineHeight
                }}
              >
                {content.subtitle}
              </motion.p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 relative group"
                style={{ 
                  backgroundColor: currentColorTheme.colors.background,
                  border: `1px solid ${currentColorTheme.colors.border}`,
                  borderRadius: currentFontTheme.borderRadius.xl,
                  boxShadow: currentColorTheme.shadows.sm
                }}
              >
                {isEditing && (
                  <button
                    onClick={() => removeFeature(index)}
                    className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      backgroundColor: currentColorTheme.colors.error,
                      borderRadius: currentFontTheme.borderRadius.full
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: `${currentColorTheme.colors.primary}20`,
                    borderRadius: currentFontTheme.borderRadius.lg
                  }}
                >
                  {isEditing ? (
                    <button
                      onClick={() => onIconClick && onIconClick(`features.${index}.icon`)}
                      className="w-full h-full text-center bg-transparent border-2 border-dashed hover:border-opacity-60 transition-colors flex items-center justify-center"
                      style={{ 
                        color: currentColorTheme.colors.primary,
                        borderColor: `${currentColorTheme.colors.primary}30`,
                        borderRadius: currentFontTheme.borderRadius.lg
                      }}
                      title="Click to change icon"
                    >
                      <IconComponent className="w-6 h-6" style={{ color: currentColorTheme.colors.primary }} />
                    </button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      key={feature.icon}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: currentColorTheme.colors.primary }} />
                    </motion.div>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        className="mb-2 bg-transparent border-2 border-dashed rounded-lg p-1 w-full"
                        style={{ 
                          color: currentColorTheme.colors.text,
                          borderColor: `${currentColorTheme.colors.primary}50`,
                          fontFamily: currentFontTheme.fonts.primary,
                          fontSize: currentFontTheme.typography.h3,
                          fontWeight: currentFontTheme.typography.headingWeight,
                          borderRadius: currentFontTheme.borderRadius.md
                        }}
                        placeholder="Feature title"
                      />
                      <textarea
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        className="bg-transparent border-2 border-dashed rounded-lg p-2 w-full resize-none"
                        style={{ 
                          color: currentColorTheme.colors.textSecondary,
                          borderColor: `${currentColorTheme.colors.primary}50`,
                          fontFamily: currentFontTheme.fonts.secondary,
                          fontSize: currentFontTheme.typography.body,
                          fontWeight: currentFontTheme.typography.bodyWeight,
                          borderRadius: currentFontTheme.borderRadius.md
                        }}
                        placeholder="Feature description"
                        rows={2}
                      />
                    </>
                  ) : (
                    <>
                      <h3 
                        className="mb-2"
                        style={{ 
                          color: currentColorTheme.colors.text,
                          fontFamily: currentFontTheme.fonts.primary,
                          fontSize: currentFontTheme.typography.h3,
                          fontWeight: currentFontTheme.typography.headingWeight,
                          lineHeight: currentFontTheme.typography.headingLineHeight
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p 
                        style={{ 
                          color: currentColorTheme.colors.textSecondary,
                          fontFamily: currentFontTheme.fonts.secondary,
                          fontSize: currentFontTheme.typography.body,
                          fontWeight: currentFontTheme.typography.bodyWeight,
                          lineHeight: currentFontTheme.typography.bodyLineHeight
                        }}
                      >
                        {feature.description}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}

          {isEditing && (
            <motion.button
              onClick={addFeature}
              className="border-2 border-dashed p-8 transition-all duration-200 flex items-center justify-center"
              style={{
                borderColor: currentColorTheme.colors.border,
                backgroundColor: 'transparent',
                borderRadius: currentFontTheme.borderRadius.xl
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = currentColorTheme.colors.primary;
                e.currentTarget.style.backgroundColor = `${currentColorTheme.colors.primary}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = currentColorTheme.colors.border;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Plus 
                  className="w-8 h-8 mx-auto mb-2" 
                  style={{ color: currentColorTheme.colors.textSecondary }} 
                />
                <span 
                  style={{ 
                    color: currentColorTheme.colors.textSecondary,
                    fontFamily: currentFontTheme.fonts.secondary,
                    fontSize: currentFontTheme.typography.body,
                    fontWeight: currentFontTheme.typography.bodyWeight
                  }}
                >
                  Add Feature
                </span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;