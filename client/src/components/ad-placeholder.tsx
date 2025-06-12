import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  size: '300x250' | '728x90';
  className?: string;
}

export default function AdPlaceholder({ size, className }: AdPlaceholderProps) {
  const dimensions = {
    '300x250': 'w-80 h-64',
    '728x90': 'w-full max-w-2xl h-24'
  };

  return (
    <div className={cn(className)}>
      <div className={cn(
        'rounded-lg border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center text-gray-600 font-medium',
        dimensions[size]
      )}>
        <span>Advertisement ({size})</span>
      </div>
    </div>
  );
}
