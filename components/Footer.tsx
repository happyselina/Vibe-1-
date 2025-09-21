
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center p-4 text-sm text-slate-400">
      <p>專為溫柔的靈魂而設計 &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
