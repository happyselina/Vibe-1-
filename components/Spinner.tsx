
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
