import { Button } from "@/components/ui/button";

interface DebateHeaderProps {
  version: 'A' | 'B';
  onVersionChange: (version: 'A' | 'B') => void;
}

export default function DebateHeader({ version, onVersionChange }: DebateHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Medical Debates</h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">View:</span>
            <Button
              onClick={() => onVersionChange(version === 'A' ? 'B' : 'A')}
              variant="outline"
              size="sm"
              className={`${
                version === 'A' 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200'
              }`}
            >
              Version {version}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
