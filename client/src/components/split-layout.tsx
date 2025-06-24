import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import AdPlaceholder from '@/components/ad-placeholder';

interface Physician {
  name: string;
  credentials: string;
  institution: string;
  image: string;
}

interface Argument {
  title: string;
  points: string[];
}

interface SplitLayoutProps {
  yesArguments: Argument[];
  noArguments: Argument[];
  yesPhysician: Physician;
  noPhysician: Physician;
}

export default function SplitLayout({ yesArguments, noArguments, yesPhysician, noPhysician }: SplitLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* YES Side - Full Left Column */}
      <div className="space-y-8 bg-gradient-to-br from-blue-50 to-blue-100 p-8 lg:border-r-2 lg:border-gray-300">
        {/* YES Physician Header */}
        <Card className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 mr-4" />
            <span className="bg-white text-blue-600 px-4 py-2 rounded-full text-lg font-bold">
              YES: Routine Surveillance is Worth It
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-shrink-0">
              <img 
                src={yesPhysician.image} 
                alt={yesPhysician.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{yesPhysician.name}</h3>
              <p className="text-blue-100 text-sm mb-1">{yesPhysician.credentials}</p>
              <p className="text-blue-200 text-sm">{yesPhysician.institution}</p>
            </div>
          </div>
        </Card>

        {/* YES Arguments */}
        {yesArguments.map((argument, index) => (
          <div key={`yes-${index}`}>
            <div className="mb-6">
              <div className="flex items-center mb-4 flex-wrap gap-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Yes
                </span>
                <h3 className="text-lg font-bold text-blue-800">
                  {argument.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {argument.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Ad after each argument except last */}
            {index < yesArguments.length - 1 && (
              <div className="flex justify-center my-8">
                <AdPlaceholder size="300x250" className="w-full max-w-sm" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* NO Side - Full Right Column */}
      <div className="space-y-8 bg-gradient-to-br from-purple-50 to-purple-100 p-8">
        {/* NO Physician Header */}
        <Card className="bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white p-6">
          <div className="flex items-center mb-4">
            <XCircle className="h-8 w-8 mr-4" />
            <span className="bg-white text-purple-600 px-4 py-2 rounded-full text-lg font-bold">
              NO: Selective Surveillance is More Appropriate
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-shrink-0">
              <img 
                src={noPhysician.image} 
                alt={noPhysician.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{noPhysician.name}</h3>
              <p className="text-purple-100 text-sm mb-1">{noPhysician.credentials}</p>
              <p className="text-purple-200 text-sm">{noPhysician.institution}</p>
            </div>
          </div>
        </Card>

        {/* NO Arguments */}
        {noArguments.map((argument, index) => (
          <div key={`no-${index}`}>
            <div className="mb-6">
              <div className="flex items-center mb-4 flex-wrap gap-3">
                <XCircle className="h-6 w-6 text-purple-700" />
                <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  No
                </span>
                <h3 className="text-lg font-bold text-purple-800">
                  {argument.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {argument.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-700 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Ad after each argument except last */}
            {index < noArguments.length - 1 && (
              <div className="flex justify-center my-8">
                <AdPlaceholder size="300x250" className="w-full max-w-sm" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}