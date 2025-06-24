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
      <div className="space-y-8 p-8 lg:border-r-2 lg:border-gray-300" style={{ background: 'linear-gradient(135deg, rgba(61, 199, 245, 0.1) 0%, rgba(61, 199, 245, 0.2) 100%)' }}>
        {/* YES Physician Header */}
        <Card className="text-white p-6" style={{ background: 'linear-gradient(135deg, #3DC7F5 0%, #2BB4E8 50%, #1A9FDA 100%)' }}>
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 mr-4" />
            <span className="bg-white px-4 py-2 rounded-full text-lg font-bold" style={{ color: '#3DC7F5' }}>
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
                <CheckCircle className="h-6 w-6" style={{ color: '#3DC7F5' }} />
                <span className="text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#3DC7F5' }}>
                  Yes
                </span>
                <h3 className="text-lg font-bold" style={{ color: '#3DC7F5' }}>
                  {argument.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {argument.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#3DC7F5' }} />
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
      <div className="space-y-8 p-8" style={{ background: 'linear-gradient(135deg, rgba(240, 117, 132, 0.1) 0%, rgba(240, 117, 132, 0.2) 100%)' }}>
        {/* NO Physician Header */}
        <Card className="text-white p-6" style={{ background: 'linear-gradient(135deg, #F07584 0%, #E85A70 50%, #D43F5C 100%)' }}>
          <div className="flex items-center mb-4">
            <XCircle className="h-8 w-8 mr-4" />
            <span className="bg-white px-4 py-2 rounded-full text-lg font-bold" style={{ color: '#F07584' }}>
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
                <XCircle className="h-6 w-6" style={{ color: '#F07584' }} />
                <span className="text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#F07584' }}>
                  No
                </span>
                <h3 className="text-lg font-bold" style={{ color: '#F07584' }}>
                  {argument.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {argument.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#F07584' }} />
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