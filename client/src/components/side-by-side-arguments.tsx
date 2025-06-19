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
        <Card className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 mr-3" />
            <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
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

        <Card className="bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white p-6">
          <div className="flex items-center mb-4">
            <XCircle className="h-6 w-6 mr-3" />
            <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
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
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
              {yesArguments[index] && (
                <>
                  <div className="flex items-center mb-4 flex-wrap gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Yes
                    </span>
                    <h3 className="text-lg font-bold text-blue-800">
                      {yesArguments[index].title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {yesArguments[index].points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>

            {/* NO Argument */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
              {noArguments[index] && (
                <>
                  <div className="flex items-center mb-4 flex-wrap gap-3">
                    <XCircle className="h-6 w-6 text-purple-700" />
                    <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      No
                    </span>
                    <h3 className="text-lg font-bold text-purple-800">
                      {noArguments[index].title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {noArguments[index].points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-purple-700 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          </div>
          
          {/* Add ad unit after every pair (except the last one) */}
          {index < maxArgs - 1 && (
            <div className="flex justify-center mt-8">
              <AdPlaceholder size="300x250" className="w-full max-w-sm" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}