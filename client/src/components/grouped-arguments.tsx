import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
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

interface GroupedArgumentsProps {
  yesArguments: Argument[];
  noArguments: Argument[];
  yesPhysician: Physician;
  noPhysician: Physician;
}

export default function GroupedArguments({ yesArguments, noArguments, yesPhysician, noPhysician }: GroupedArgumentsProps) {
  return (
    <div className="space-y-0 md:space-y-0">
      {/* Physician Headers - Side by side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* YES Physician */}
        <Card className="bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-600 text-white p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 mr-4" />
            <span className="bg-white text-blue-600 px-4 py-2 rounded-full text-lg font-bold">
              YES: Routine Surveillance is Essential
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <img 
                src={yesPhysician.image} 
                alt={yesPhysician.name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/30"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-1 truncate">{yesPhysician.name}</h3>
              <p className="text-blue-100 text-xs md:text-sm mb-1 leading-tight">{yesPhysician.credentials}</p>
              <p className="text-blue-200 text-xs md:text-sm leading-tight">{yesPhysician.institution}</p>
            </div>
          </div>
        </Card>

        {/* NO Physician */}
        <Card className="bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white p-6">
          <div className="flex items-center mb-4">
            <XCircle className="h-8 w-8 mr-4" />
            <span className="bg-white text-purple-600 px-4 py-2 rounded-full text-lg font-bold">
              NO: Selective Surveillance is More Appropriate
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <img 
                src={noPhysician.image} 
                alt={noPhysician.name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/30"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-1 truncate">{noPhysician.name}</h3>
              <p className="text-purple-100 text-xs md:text-sm mb-1 leading-tight">{noPhysician.credentials}</p>
              <p className="text-purple-200 text-xs md:text-sm leading-tight">{noPhysician.institution}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Desktop: Side-by-side columns | Mobile: Alternating arguments */}
      <div className="hidden md:grid md:grid-cols-2 gap-8">
        {/* YES Column - All Arguments (Desktop only) */}
        <div>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800">Key Arguments</h2>
            </div>
            <div className="space-y-6">
              {yesArguments.map((argument, index) => (
                <div key={index}>
                  <div className="flex items-center mb-3 gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
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
                  
                  {/* Ad after 2nd argument */}
                  {index === 1 && (
                    <div className="flex justify-center my-8">
                      <AdPlaceholder size="300x250" className="mx-auto" />
                    </div>
                  )}
                  
                  {/* Ad after 5th argument */}
                  {index === 4 && (
                    <div className="flex justify-center my-8">
                      <AdPlaceholder size="300x250" className="mx-auto" />
                    </div>
                  )}
                  
                  {index < yesArguments.length - 1 && (
                    <div className="border-b border-blue-200 my-4"></div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* NO Column - All Arguments (Desktop only) */}
        <div>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-800">Key Arguments</h2>
            </div>
            <div className="space-y-6">
              {noArguments.map((argument, index) => (
                <div key={index}>
                  <div className="flex items-center mb-3 gap-3">
                    <XCircle className="h-5 w-5 text-purple-700" />
                    <span className="bg-purple-700 text-white px-2 py-1 rounded-full text-xs font-semibold">
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
                  
                  {/* Ad after 2nd argument */}
                  {index === 1 && (
                    <div className="flex justify-center my-8">
                      <AdPlaceholder size="300x250" className="mx-auto" />
                    </div>
                  )}
                  
                  {/* Ad after 5th argument */}
                  {index === 4 && (
                    <div className="flex justify-center my-8">
                      <AdPlaceholder size="300x250" className="mx-auto" />
                    </div>
                  )}
                  
                  {index < noArguments.length - 1 && (
                    <div className="border-b border-purple-200 my-4"></div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile: Alternating YES/NO arguments - Disconnected from physician boxes */}
      <div className="md:hidden space-y-6 mt-16">
        {Array.from({ length: Math.max(yesArguments.length, noArguments.length) }).map((_, index) => (
          <div key={index} className="space-y-6">
            {/* YES Argument */}
            {yesArguments[index] && (
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
                <div className="flex items-center mb-3 gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
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
                
                {/* Ad after 2nd YES argument on mobile */}
                {index === 1 && (
                  <div className="flex justify-center mt-8">
                    <AdPlaceholder size="300x250" className="mx-auto" />
                  </div>
                )}
                
                {/* Ad after 5th YES argument on mobile */}
                {index === 4 && (
                  <div className="flex justify-center mt-8">
                    <AdPlaceholder size="300x250" className="mx-auto" />
                  </div>
                )}
              </Card>
            )}

            {/* NO Argument */}
            {noArguments[index] && (
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
                <div className="flex items-center mb-3 gap-3">
                  <XCircle className="h-5 w-5 text-purple-700" />
                  <span className="bg-purple-700 text-white px-2 py-1 rounded-full text-xs font-semibold">
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
                
                {/* Ad after 2nd NO argument on mobile */}
                {index === 1 && (
                  <div className="flex justify-center mt-8">
                    <AdPlaceholder size="300x250" className="mx-auto" />
                  </div>
                )}
                
                {/* Ad after 5th NO argument on mobile */}
                {index === 4 && (
                  <div className="flex justify-center mt-8">
                    <AdPlaceholder size="300x250" className="mx-auto" />
                  </div>
                )}
              </Card>
            )}
          </div>
        ))}
      </div>


    </div>
  );
}