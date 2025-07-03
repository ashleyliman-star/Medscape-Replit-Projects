import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface AdPlaceholderProps {
  size: '300x250' | '728x90' | 'responsive-desktop-banner';
  className?: string;
  position?: number;
}

export default function AdPlaceholder({ size, className, position }: AdPlaceholderProps) {
  const dimensions = {
    '300x250': 'w-80 h-64',
    '728x90': 'w-full h-24',
    'responsive-desktop-banner': 'w-80 h-64 md:w-full md:h-24'
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
            <>
              <span className="md:hidden">Advertisement (300x250)</span>
              <span className="hidden md:inline">Advertisement (728x90)</span>
            </>
          ) : (
            `Advertisement (${size})`
          )}
        </span>
      </div>
    </div>
  );
}
