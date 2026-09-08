import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const textSizeClass = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center tracking-tight font-bold transition-opacity hover:opacity-90 ${textSizeClass} ${className}`}
      aria-label="ResumeMatch Home"
    >
      <span className="text-zinc-900">Resume</span>
      <span className="text-[#2563EB]">Match</span>
    </Link>
  );
};
