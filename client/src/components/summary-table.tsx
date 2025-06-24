import { Card } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

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
          <div className="border-2 rounded-lg p-6" style={{ background: 'linear-gradient(135deg, rgba(61, 199, 245, 0.1) 0%, rgba(61, 199, 245, 0.2) 100%)', borderColor: '#3DC7F5' }}>
            <div className="flex items-center mb-4">
              <ThumbsUp className="h-6 w-6 mr-3" style={{ color: '#1A9FDA' }} />
              <h3 className="text-lg font-bold" style={{ color: '#1A9FDA' }}>
                Supporting Routine Surveillance
              </h3>
            </div>
            <ul className="space-y-3">
              {yesPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#1A9FDA' }}></span>
                  <span className="text-base md:text-lg text-gray-700 leading-relaxed flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NO Side Summary */}
          <div className="border-2 rounded-lg p-6" style={{ background: 'linear-gradient(135deg, rgba(240, 117, 132, 0.1) 0%, rgba(240, 117, 132, 0.2) 100%)', borderColor: '#F07584' }}>
            <div className="flex items-center mb-4">
              <ThumbsDown className="h-6 w-6 mr-3" style={{ color: '#D43F5C' }} />
              <h3 className="text-lg font-bold" style={{ color: '#D43F5C' }}>
                Supporting Selective Surveillance
              </h3>
            </div>
            <ul className="space-y-3">
              {noPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#D43F5C' }}></span>
                  <span className="text-base md:text-lg text-gray-700 leading-relaxed flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}