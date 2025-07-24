import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesGridProps {
  content: {
    title: string;
    subtitle: string;
    services: Service[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  onIconClick?: (field: string) => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ content, isEditing, onChange, onIconClick }) => {
  const { currentColorTheme, currentFontTheme } = useTheme();

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...content.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    handleChange('services', updatedServices);
  };

  const addService = () => {
    const newService: Service = {
      icon: 'Zap',
      title: 'New Service',
      description: 'Service description goes here.',
    };
    handleChange('services', [...content.services, newService]);
  };

  const removeService = (index: number) => {
    const updatedServices = content.services.filter((_, i) => i !== index);
    handleChange('services', updatedServices);
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
        backgroundColor: currentColorTheme.colors.background,
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
                className="max-w-2xl mx-auto"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => {
            const IconComponent = getIconComponent(service.icon);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 transition-shadow duration-300 relative group"
                style={{ 
                  backgroundColor: currentColorTheme.colors.surface,
                  boxShadow: currentColorTheme.shadows.lg,
                  borderRadius: currentFontTheme.borderRadius.xl,
                  border: `1px solid ${currentColorTheme.colors.border}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = currentColorTheme.shadows.xl;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = currentColorTheme.shadows.lg;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {isEditing && (
                  <button
                    onClick={() => removeService(index)}
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
                  className="w-16 h-16 flex items-center justify-center mb-6"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentColorTheme.colors.primary}, ${currentColorTheme.colors.secondary})`,
                    borderRadius: currentFontTheme.borderRadius.xl,
                    boxShadow: currentColorTheme.shadows.md
                  }}
                >
                  {isEditing ? (
                    <button
                      onClick={() => onIconClick && onIconClick(`services.${index}.icon`)}
                      className="w-full h-full text-center text-white bg-transparent border-2 border-dashed hover:border-white/60 transition-colors flex items-center justify-center"
                      style={{ 
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: currentFontTheme.borderRadius.xl
                      }}
                      title="Click to change icon"
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      key={service.icon}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </div>

                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      className="mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                      style={{ 
                        color: currentColorTheme.colors.text,
                        borderColor: `${currentColorTheme.colors.primary}50`,
                        fontFamily: currentFontTheme.fonts.primary,
                        fontSize: currentFontTheme.typography.h3,
                        fontWeight: currentFontTheme.typography.headingWeight,
                        borderRadius: currentFontTheme.borderRadius.md
                      }}
                      placeholder="Service title"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      className="bg-transparent border-2 border-dashed rounded-lg p-2 w-full resize-none"
                      style={{ 
                        color: currentColorTheme.colors.textSecondary,
                        borderColor: `${currentColorTheme.colors.primary}50`,
                        fontFamily: currentFontTheme.fonts.secondary,
                        fontSize: currentFontTheme.typography.body,
                        fontWeight: currentFontTheme.typography.bodyWeight,
                        borderRadius: currentFontTheme.borderRadius.md
                      }}
                      placeholder="Service description"
                      rows={3}
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      className="mb-4"
                      style={{ 
                        color: currentColorTheme.colors.text,
                        fontFamily: currentFontTheme.fonts.primary,
                        fontSize: currentFontTheme.typography.h3,
                        fontWeight: currentFontTheme.typography.headingWeight,
                        lineHeight: currentFontTheme.typography.headingLineHeight
                      }}
                    >
                      {service.title}
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
                      {service.description}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}

          {isEditing && (
            <motion.button
              onClick={addService}
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
                  Add Service
                </span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;