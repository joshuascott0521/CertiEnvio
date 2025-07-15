import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <div className="border-b pb-2 mb-6">
          <h3 className="text-lg font-medium">{subtitle}</h3>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
