import { Button } from "@/components/ui/button";

interface DebateHeaderProps {
  version: 'A' | 'B' | 'D' | 'E';
  onVersionChange: (version: 'A' | 'B' | 'D' | 'E') => void;
}

export default function DebateHeader({ version, onVersionChange }: DebateHeaderProps) {
  const handleVersionChange = (newVersion: 'A' | 'B' | 'D' | 'E') => {
    onVersionChange(newVersion);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center">
            <img 
              src="/attached_assets/Medscape_Logo.svg%20(1)_1750723648901.png"
              alt="Medscape" 
              className="h-8"
            />
          </div>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleVersionChange('A')}
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
                  onClick={() => handleVersionChange('B')}
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
                  onClick={() => handleVersionChange('D')}
                  variant="outline"
                  size="sm"
                  className={`${
                    version === 'D' 
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Version D
                </Button>
                <Button
                  onClick={() => handleVersionChange('E')}
                  variant="outline"
                  size="sm"
                  className={`${
                    version === 'E' 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Version E
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}