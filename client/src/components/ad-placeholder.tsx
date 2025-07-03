import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";

interface AdPlaceholderProps {
  size: '300x250' | '728x90' | 'responsive-desktop-banner';
  className?: string;
  position?: number;
}

export default function AdPlaceholder({ size, className, position }: AdPlaceholderProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const dimensions = {
    '300x250': 'w-80 h-64',
    '728x90': 'h-24',
    'responsive-desktop-banner': 'w-80 h-64 md:h-24'
  };

  const getStyles = () => {
    if (size === '728x90') {
      return { width: '728px', height: '90px' };
    }
    if (size === 'responsive-desktop-banner') {
      if (isDesktop) {
        return { width: '728px', height: '90px' };
      } else {
        return { width: '300px', height: '250px' };
      }
    }
    return {};
  };

  const handleAdClick = () => {
    trackEvent(
      'ad_click',
      'advertisement',
      `Position ${position || 'Unknown'}`,
      1
    );
  };

  return (
    <div className={cn(className)}>
      <div 
        className={cn(
          'rounded-lg border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center text-gray-600 font-medium cursor-pointer hover:bg-gray-200 transition-colors',
          dimensions[size]
        )}
        style={getStyles()}
        onClick={handleAdClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAdClick();
          }
        }}
      >
        <span>
          {size === 'responsive-desktop-banner' ? (
            `Advertisement (${isDesktop ? '728x90' : '300x250'})`
          ) : (
            `Advertisement (${size})`
          )}
        </span>
      </div>
    </div>
  );
}
