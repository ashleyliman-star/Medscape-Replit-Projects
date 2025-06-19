import { Button } from "@/components/ui/button";

interface DebateHeaderProps {
  version: 'A' | 'B' | 'C';
  onVersionChange: (version: 'A' | 'B' | 'C') => void;
}

export default function DebateHeader({ version, onVersionChange }: DebateHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Medical Debates</h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex space-x-2">
              <Button
                onClick={() => onVersionChange('A')}
                variant="outline"
                size="sm"
                className={`${
                  version === 'A' 
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Version A
              </Button>
              <Button
                onClick={() => onVersionChange('B')}
                variant="outline"
                size="sm"
                className={`${
                  version === 'B' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Version B
              </Button>
              <Button
                onClick={() => onVersionChange('C')}
                variant="outline"
                size="sm"
                className={`${
                  version === 'C' 
                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Version C
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
