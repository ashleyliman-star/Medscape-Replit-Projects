import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface Argument {
  title: string;
  points: string[];
}

interface SummaryTableProps {
  yesArguments: Argument[];
  noArguments: Argument[];
}

export default function SummaryTable({ yesArguments, noArguments }: SummaryTableProps) {
  // Get main argument titles from both sides
  const yesPoints = yesArguments.map(arg => arg.title);
  const noPoints = noArguments.map(arg => arg.title);

  return (
    <div className="mb-12">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Summary of Key Points
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* YES Side Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-bold text-blue-800">
                Supporting Routine Surveillance
              </h3>
            </div>
            <ul className="space-y-3">
              {yesPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm text-gray-700 leading-relaxed flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NO Side Summary */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <XCircle className="h-6 w-6 text-purple-700 mr-3" />
              <h3 className="text-lg font-bold text-purple-800">
                Supporting Selective Surveillance
              </h3>
            </div>
            <ul className="space-y-3">
              {noPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm text-gray-700 leading-relaxed flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}