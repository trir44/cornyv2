import React from 'react';

interface CornIconProps {
  className?: string;
}

export const CornIcon: React.FC<CornIconProps> = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3c0 0-3 1.5-3 4.5c0 3 3 4.5 3 4.5s3-1.5 3-4.5c0-3-3-4.5-3-4.5z" />
    <path d="M12 12v9" />
    <path d="M9 14c-1 0-2 .5-2 2s1 2 2 2" />
    <path d="M15 14c1 0 2 .5 2 2s-1 2-2 2" />
    <path d="M9 18c-1 0-2 .5-2 2" />
    <path d="M15 18c1 0 2 .5 2 2" />
    <path d="M12 12c2 0 3-1.5 3-1.5" />
    <path d="M12 12c-2 0-3-1.5-3-1.5" />
  </svg>
);