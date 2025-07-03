import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface AdPlaceholderProps {
  size: '300x250' | '728x90';
  className?: string;
  position?: number;
}

export default function AdPlaceholder({ size, className, position }: AdPlaceholderProps) {
  const dimensions = {
    '300x250': 'w-80 h-64',
    '728x90': 'w-full max-w-2xl h-24'
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
        <span>Advertisement ({size})</span>
      </div>
    </div>
  );
}
