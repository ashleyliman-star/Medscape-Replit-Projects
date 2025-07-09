import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";
import alcoholAdImage from "@assets/MM_Alcohol_Post-Event_v3_728x90_1752081869926.jpg";

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
    
    // Navigate to specific URL for first 728x90 unit
    if (size === '728x90' && position === 1) {
      window.open('https://www.medscape.com/viewarticle/cancer-risk-hiding-your-patients-glass-rethinking-alcohol-2025a1000c9d?ecd=house-1_mscpmrk_masters_alc', '_blank');
    }
  };

  // Show the Medscape alcohol cancer ad for first 728x90 unit on desktop
  const showMedscapeAd = size === '728x90' && position === 1 && isDesktop;

  return (
    <div className={cn(className)}>
      {showMedscapeAd ? (
        <a
          href="https://www.medscape.com/viewarticle/cancer-risk-hiding-your-patients-glass-rethinking-alcohol-2025a1000c9d?ecd=house-1_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={alcoholAdImage}
            alt="The Cancer Risk Hiding in Your Patient's Glass - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '728px', height: '90px' }}
          />
        </a>
      ) : (
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
      )}
    </div>
  );
}
