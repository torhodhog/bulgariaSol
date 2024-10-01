import React from 'react';

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  maxWidth?: string;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ children, maxWidth = '1200px' }) => {
  return (
    <div className="max-width-wrapper" style={{ maxWidth, margin: '0 auto', padding: '0 20px' }}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;