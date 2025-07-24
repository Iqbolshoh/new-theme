import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, X } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface Plan {
  name: string;
  price: string;
  features: string[];
}

interface PricingCardsProps {
  content: {
    title: string;
    plans: Plan[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({ content, isEditing, onChange }) => {
  const { currentColorTheme, currentFontTheme } = useTheme();

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handlePlanChange = (index: number, field: string, value: any) => {
    const updatedPlans = [...content.plans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    handleChange('plans', updatedPlans);
  };

  const addPlan = () => {
    const newPlan: Plan = {
      name: 'New Plan',
      price: '$19',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    };
    handleChange('plans', [...content.plans, newPlan]);
  };

  const removePlan = (index: number) => {
    const updatedPlans = content.plans.filter((_, i) => i !== index);
    handleChange('plans', updatedPlans);
  };

  const addFeature = (planIndex: number) => {
    const updatedPlans = [...content.plans];
    updatedPlans[planIndex].features.push('New Feature');
    handleChange('plans', updatedPlans);
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...content.plans];
    updatedPlans[planIndex].features = updatedPlans[planIndex].features.filter((_, i) => i !== featureIndex);
    handleChange('plans', updatedPlans);
  };

  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const updatedPlans = [...content.plans];
    updatedPlans[planIndex].features[featureIndex] = value;
    handleChange('plans', updatedPlans);
  };

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: currentColorTheme.colors.surface,
        fontFamily: currentFontTheme.fonts.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
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
                placeholder="Enter section title"
              />
            ) : (
              <h2
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
              </h2>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 transition-shadow duration-300 relative group border-2 ${
                index === 1 ? 'scale-105' : ''
              }`}
              style={{
                backgroundColor: currentColorTheme.colors.surface,
                borderColor: index === 1 ? currentColorTheme.colors.primary : currentColorTheme.colors.border,
                boxShadow: currentFontTheme.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                borderRadius: currentFontTheme.borderRadius.xl
              }}
            >
              {index === 1 && (
                <div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-semibold"
                  style={{ 
                    backgroundColor: currentColorTheme.colors.primary,
                    borderRadius: currentFontTheme.borderRadius.full,
                    fontFamily: currentFontTheme.fonts.secondary,
                    fontSize: currentFontTheme.typography.small,
                    fontWeight: currentFontTheme.typography.buttonWeight
                  }}
                >
                  Popular
                </div>
              )}

              {isEditing && (
                <button
                  onClick={() => removePlan(index)}
                  className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: currentColorTheme.colors.error,
                    borderRadius: currentFontTheme.borderRadius.full
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="text-center mb-8">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => handlePlanChange(index, 'name', e.target.value)}
                      className="mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full text-center"
                      style={{
                        color: currentColorTheme.colors.text,
                        borderColor: `${currentColorTheme.colors.primary}50`,
                        fontFamily: currentFontTheme.fonts.primary,
                        fontSize: currentFontTheme.typography.h3,
                        fontWeight: currentFontTheme.typography.headingWeight,
                        borderRadius: currentFontTheme.borderRadius.md
                      }}
                      placeholder="Plan name"
                    />
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) => handlePlanChange(index, 'price', e.target.value)}
                      className="bg-transparent border-2 border-dashed rounded-lg p-2 w-full text-center"
                      style={{
                        color: currentColorTheme.colors.primary,
                        borderColor: `${currentColorTheme.colors.primary}50`,
                        fontFamily: currentFontTheme.fonts.accent,
                        fontSize: currentFontTheme.typography.h2,
                        fontWeight: currentFontTheme.typography.headingWeight,
                        borderRadius: currentFontTheme.borderRadius.md
                      }}
                      placeholder="$19"
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
                      {plan.name}
                    </h3>
                    <div
                      className="mb-2"
                      style={{
                        color: currentColorTheme.colors.primary,
                        fontFamily: currentFontTheme.fonts.accent,
                        fontSize: currentFontTheme.typography.h2,
                        fontWeight: currentFontTheme.typography.headingWeight
                      }}
                    >
                      {plan.price}
                    </div>
                    <p
                      style={{
                        color: currentColorTheme.colors.textSecondary,
                        fontFamily: currentFontTheme.fonts.secondary,
                        fontSize: currentFontTheme.typography.body,
                        fontWeight: currentFontTheme.typography.bodyWeight
                      }}
                    >
                      per month
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${currentColorTheme.colors.success}20`,
                        borderRadius: currentFontTheme.borderRadius.full
                      }}
                    >
                      <Check className="w-3 h-3" style={{ color: currentColorTheme.colors.success }} />
                    </div>
                    {isEditing ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, featureIndex, e.target.value)}
                          className="flex-1 bg-transparent border-2 border-dashed rounded-lg p-1 text-sm"
                          style={{
                            color: currentColorTheme.colors.text,
                            borderColor: `${currentColorTheme.colors.primary}50`,
                            fontFamily: currentFontTheme.fonts.secondary,
                            fontSize: currentFontTheme.typography.body,
                            fontWeight: currentFontTheme.typography.bodyWeight,
                            borderRadius: currentFontTheme.borderRadius.md
                          }}
                          placeholder="Feature"
                        />
                        <button
                          onClick={() => removeFeature(index, featureIndex)}
                          className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                          style={{ 
                            backgroundColor: currentColorTheme.colors.error,
                            borderRadius: currentFontTheme.borderRadius.full
                          }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </div>
                    ) : (
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
                    )}
                  </div>
                ))}

                {isEditing && (
                  <button
                    onClick={() => addFeature(index)}
                    className="flex items-center gap-2 text-sm"
                    style={{ 
                      color: currentColorTheme.colors.primary,
                      fontFamily: currentFontTheme.fonts.secondary,
                      fontSize: currentFontTheme.typography.small,
                      fontWeight: currentFontTheme.typography.bodyWeight
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                )}
              </div>

              <button
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{
                  backgroundColor: index === 1 ? currentColorTheme.colors.primary : `${currentColorTheme.colors.primary}15`,
                  color: index === 1 ? '#ffffff' : currentColorTheme.colors.primary,
                  fontFamily: currentFontTheme.fonts.secondary,
                  fontSize: currentFontTheme.typography.button,
                  fontWeight: currentFontTheme.typography.buttonWeight,
                  borderRadius: currentFontTheme.borderRadius.md,
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (index !== 1) {
                    e.currentTarget.style.backgroundColor = currentColorTheme.colors.primary;
                    e.currentTarget.style.color = '#ffffff';
                  } else {
                    e.currentTarget.style.backgroundColor = currentColorTheme.colors.secondary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== 1) {
                    e.currentTarget.style.backgroundColor = `${currentColorTheme.colors.primary}15`;
                    e.currentTarget.style.color = currentColorTheme.colors.primary;
                  } else {
                    e.currentTarget.style.backgroundColor = currentColorTheme.colors.primary;
                  }
                }}
              >
                Get Started
              </button>
            </motion.div>
          ))}

          {isEditing && (
            <motion.button
              onClick={addPlan}
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
                  Add Plan
                </span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;