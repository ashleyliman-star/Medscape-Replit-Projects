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

  const adContent = {
    '300x250': (
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">MedDevice Pro</h3>
          <p className="text-sm opacity-90">Advanced Mammography Systems</p>
        </div>
        <div>
          <p className="text-xs mb-2">Improve early detection with AI-powered imaging</p>
          <button className="bg-white text-blue-600 px-3 py-1 text-xs rounded font-semibold">Learn More</button>
        </div>
      </div>
    ),
    '728x90': (
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg h-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white text-green-600 w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold text-lg">
            M+
          </div>
          <div>
            <h3 className="font-bold text-lg">Medscape CME</h3>
            <p className="text-sm opacity-90">Earn CME credits on breast cancer screening guidelines</p>
          </div>
        </div>
        <button className="bg-white text-green-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors">
          Start Course
        </button>
      </div>
    )
  };

  return (
    <div className={cn(className)}>
      <div className={cn(dimensions[size])}>
        {adContent[size]}
      </div>
    </div>
  );
}
