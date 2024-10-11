// NoLayout.js
import React from 'react';

const NoLayout = ({ children }) => {
  return (
    <div>
      {children}  {/* Only render the content passed as children */}
    </div>
  );
};

export default NoLayout;
