import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Argument {
  title: string;
  points: string[];
}

interface SummaryTableUnboxedProps {
  yesArguments: Argument[];
  noArguments: Argument[];
}

export default function SummaryTableUnboxed({ yesArguments, noArguments }: SummaryTableUnboxedProps) {
  // Get main argument titles from both sides
  const yesPoints = yesArguments.map(arg => arg.title);
  const noPoints = noArguments.map(arg => arg.title);

  return (
    <div className="mb-8 md:mb-12">
      <div className="rounded-lg shadow-md border border-gray-200 p-6" style={{ backgroundColor: '#e0e8f3' }}>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
          Summary of Key Points
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-3 md:gap-4 max-w-5xl mx-auto">
          {/* YES Side Summary */}
          <div className="p-4 md:p-6 lg:pl-12">
            <div className="flex items-center mb-3 md:mb-4">
              <ThumbsUp className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" style={{ color: '#1A9FDA' }} />
              <h3 className="text-base md:text-lg font-bold" style={{ color: '#1A9FDA' }}>
                Supporting Routine Surveillance
              </h3>
            </div>
            <ul className="space-y-2 md:space-y-3">
              {yesPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#1A9FDA' }}></span>
                  <span className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NO Side Summary */}
          <div className="p-4 md:p-6">
            <div className="flex items-center mb-3 md:mb-4">
              <ThumbsDown className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" style={{ color: '#D43F5C' }} />
              <h3 className="text-base md:text-lg font-bold" style={{ color: '#D43F5C' }}>
                Supporting Selective Surveillance
              </h3>
            </div>
            <ul className="space-y-2 md:space-y-3">
              {noPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#D43F5C' }}></span>
                  <span className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}