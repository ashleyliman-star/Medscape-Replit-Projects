import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AdPlaceholder from "./ad-placeholder";

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

interface SideBySideArgumentsProps {
  yesArguments: Argument[];
  noArguments: Argument[];
  yesPhysician: Physician;
  noPhysician: Physician;
}

export default function SideBySideArguments({ yesArguments, noArguments, yesPhysician, noPhysician }: SideBySideArgumentsProps) {
  const maxArgs = Math.max(yesArguments.length, noArguments.length);
  
  return (
    <div className="space-y-8">
      {/* Physician Headers */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="text-white p-6" style={{ background: 'linear-gradient(135deg, #3DC7F5 0%, #2BB4E8 50%, #1A9FDA 100%)' }}>
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 mr-4" />
            <span className="bg-white px-4 py-2 rounded-full text-lg font-bold" style={{ color: '#3DC7F5' }}>
              YES: Routine Surveillance is Worth It
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarImage src={yesPhysician.image} alt={yesPhysician.name} />
              <AvatarFallback>{yesPhysician.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-bold">{yesPhysician.name}</h3>
              <p className="text-blue-100 text-sm">{yesPhysician.credentials}</p>
              <p className="text-blue-50 text-sm">{yesPhysician.institution}</p>
            </div>
          </div>
        </Card>

        <Card className="text-white p-6" style={{ background: 'linear-gradient(135deg, #F07584 0%, #E85A70 50%, #D43F5C 100%)' }}>
          <div className="flex items-center mb-4">
            <XCircle className="h-8 w-8 mr-4" />
            <span className="bg-white px-4 py-2 rounded-full text-lg font-bold" style={{ color: '#F07584' }}>
              NO: Selective Surveillance is More Appropriate
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarImage src={noPhysician.image} alt={noPhysician.name} />
              <AvatarFallback>{noPhysician.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-bold">{noPhysician.name}</h3>
              <p className="text-purple-100 text-sm">{noPhysician.credentials}</p>
              <p className="text-purple-50 text-sm">{noPhysician.institution}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Arguments */}
      {Array.from({ length: maxArgs }, (_, index) => (
        <div key={index}>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* YES Argument */}
            <Card className="p-6 border-2" style={{ background: 'linear-gradient(135deg, rgba(61, 199, 245, 0.1) 0%, rgba(61, 199, 245, 0.2) 100%)', borderColor: '#3DC7F5' }}>
              {yesArguments[index] && (
                <>
                  <div className="flex items-center mb-4 flex-wrap gap-3">
                    <CheckCircle className="h-6 w-6" style={{ color: '#3DC7F5' }} />
                    <span className="text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#3DC7F5' }}>
                      Yes
                    </span>
                    <h3 className="text-lg font-bold" style={{ color: '#3DC7F5' }}>
                      {yesArguments[index].title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {yesArguments[index].points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#3DC7F5' }} />
                        <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>

            {/* NO Argument */}
            <Card className="p-6 border-2" style={{ background: 'linear-gradient(135deg, rgba(240, 117, 132, 0.1) 0%, rgba(240, 117, 132, 0.2) 100%)', borderColor: '#F07584' }}>
              {noArguments[index] && (
                <>
                  <div className="flex items-center mb-4 flex-wrap gap-3">
                    <XCircle className="h-6 w-6" style={{ color: '#F07584' }} />
                    <span className="text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#F07584' }}>
                      No
                    </span>
                    <h3 className="text-lg font-bold" style={{ color: '#F07584' }}>
                      {noArguments[index].title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {noArguments[index].points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#F07584' }} />
                        <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          </div>
          
          {/* Add ad unit after each pair on mobile, after every 2 pairs on desktop */}
          {index < maxArgs - 1 && (
            <>
              {/* Mobile: Show after each pair */}
              <div className="flex justify-center mt-8 lg:hidden">
                <AdPlaceholder size="300x250" className="w-full max-w-sm" />
              </div>
              {/* Desktop: Show after every 2 pairs */}
              {(index + 1) % 2 === 0 && (
                <div className="hidden lg:flex justify-center mt-8">
                  <AdPlaceholder size="300x250" className="w-full max-w-sm" />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}