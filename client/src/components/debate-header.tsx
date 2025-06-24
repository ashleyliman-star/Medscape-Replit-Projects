import { Button } from "@/components/ui/button";
import medscapeLogo from "@assets/mscp-logo_1750724375360.avif";

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
              src={medscapeLogo}
              alt="Medscape" 
              className="h-8"
            />
          </div>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">View:</span>
              <div className="flex space-x-1">
                <Button
                  onClick={() => handleVersionChange('A')}
                  variant="outline"
                  size="sm"
                  className={`text-xs px-2 py-1 h-7 ${
                    version === 'A' 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  A (KOL)
                </Button>
                <Button
                  onClick={() => handleVersionChange('B')}
                  variant="outline"
                  size="sm"
                  className={`text-xs px-2 py-1 h-7 ${
                    version === 'B' 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  B (no KOL)
                </Button>
                <Button
                  onClick={() => handleVersionChange('E')}
                  variant="outline"
                  size="sm"
                  className={`text-xs px-2 py-1 h-7 ${
                    version === 'E' 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  C1 (expanded)
                </Button>
                <Button
                  onClick={() => handleVersionChange('D')}
                  variant="outline"
                  size="sm"
                  className={`text-xs px-2 py-1 h-7 ${
                    version === 'D' 
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  C2 (expanded, diff design)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}