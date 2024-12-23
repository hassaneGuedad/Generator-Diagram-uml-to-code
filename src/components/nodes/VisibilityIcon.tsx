import React from 'react';

interface VisibilityIconProps {
  visibility: 'public' | 'private' | 'protected';
}

export function VisibilityIcon({ visibility }: VisibilityIconProps) {
  switch (visibility) {
    case 'public':
      return <span>+</span>;
    case 'private':
      return <span>-</span>;
    case 'protected':
      return <span>#</span>;
  }
}