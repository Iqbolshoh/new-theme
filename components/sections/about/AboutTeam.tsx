import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface AboutTeamProps {
  content: {
    title: string;
    subtitle: string;
    teamMembers: TeamMember[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
}

const AboutTeam: React.FC<AboutTeamProps> = ({ content, isEditing, onChange }) => {
  const { currentColorTheme, currentFontTheme } = useTheme();

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...content.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    handleChange('teamMembers', updatedMembers);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
              style={{ 
                backgroundColor: currentColorTheme.colors.surface,
                boxShadow: currentColorTheme.shadows.lg,
                borderRadius: currentFontTheme.borderRadius.xl
              }}
            >
              {isEditing ? (
                <>
                  <input
                    type="url"
                    value={member.image}
                    onChange={(e) => handleMemberChange(index, 'image', e.target.value)}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-dashed p-2 text-center text-xs"
                    style={{ 
                      borderColor: currentColorTheme.colors.border,
                      color: currentColorTheme.colors.textSecondary,
                      fontFamily: currentFontTheme.fonts.secondary,
                      borderRadius: currentFontTheme.borderRadius.full
                    }}
                    placeholder="Image URL"
                  />
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    className="mb-2 bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-center"
                    style={{ 
                      color: currentColorTheme.colors.text,
                      borderColor: `${currentColorTheme.colors.primary}50`,
                      fontFamily: currentFontTheme.fonts.primary,
                      fontSize: currentFontTheme.typography.h3,
                      fontWeight: currentFontTheme.typography.headingWeight,
                      borderRadius: currentFontTheme.borderRadius.md
                    }}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                    className="mb-3 bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-center"
                    style={{ 
                      color: currentColorTheme.colors.primary,
                      borderColor: `${currentColorTheme.colors.primary}50`,
                      fontFamily: currentFontTheme.fonts.secondary,
                      fontSize: currentFontTheme.typography.body,
                      fontWeight: currentFontTheme.typography.bodyWeight,
                      borderRadius: currentFontTheme.borderRadius.md
                    }}
                    placeholder="Role"
                  />
                  <textarea
                    value={member.bio}
                    onChange={(e) => handleMemberChange(index, 'bio', e.target.value)}
                    className="bg-transparent border-2 border-dashed rounded-lg p-2 w-full resize-none"
                    style={{ 
                      color: currentColorTheme.colors.textSecondary,
                      borderColor: `${currentColorTheme.colors.primary}50`,
                      fontFamily: currentFontTheme.fonts.secondary,
                      fontSize: currentFontTheme.typography.small,
                      fontWeight: currentFontTheme.typography.bodyWeight,
                      borderRadius: currentFontTheme.borderRadius.md
                    }}
                    placeholder="Bio"
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto mb-4 object-cover"
                    style={{ 
                      borderRadius: currentFontTheme.borderRadius.full,
                      border: `2px solid ${currentColorTheme.colors.border}`
                    }}
                  />
                  <h3 
                    className="mb-2"
                    style={{ 
                      color: currentColorTheme.colors.text,
                      fontFamily: currentFontTheme.fonts.primary,
                      fontSize: currentFontTheme.typography.h3,
                      fontWeight: currentFontTheme.typography.headingWeight
                    }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="mb-3"
                    style={{ 
                      color: currentColorTheme.colors.primary,
                      fontFamily: currentFontTheme.fonts.secondary,
                      fontSize: currentFontTheme.typography.body,
                      fontWeight: currentFontTheme.typography.bodyWeight
                    }}
                  >
                    {member.role}
                  </p>
                  <p 
                    style={{ 
                      color: currentColorTheme.colors.textSecondary,
                      fontFamily: currentFontTheme.fonts.secondary,
                      fontSize: currentFontTheme.typography.small,
                      fontWeight: currentFontTheme.typography.bodyWeight,
                      lineHeight: currentFontTheme.typography.bodyLineHeight
                    }}
                  >
                    {member.bio}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;