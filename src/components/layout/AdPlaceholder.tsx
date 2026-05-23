import React from 'react'

interface AdPlaceholderProps {
  slot: string;
  className?: string;
}

export function AdPlaceholder({ slot, className = '' }: AdPlaceholderProps) {
  return (
    <div className={`w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300 dark:border-gray-700 ${className}`}>
      <span>Ad Placeholder ({slot})</span>
    </div>
  )
}
