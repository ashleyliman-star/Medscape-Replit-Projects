
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
  // Group arguments in pairs
  const groupSize = 2;
  const maxLength = Math.max(yesArguments.length, noArguments.length);
  const numberOfGroups = Math.ceil(maxLength / groupSize);

  const argumentGroups = [];
  for (let i = 0; i < numberOfGroups; i++) {
    const startIndex = i * groupSize;
    const endIndex = startIndex + groupSize;
    
    argumentGroups.push({
      yesArgs: yesArguments.slice(startIndex, endIndex),
      noArgs: noArguments.slice(startIndex, endIndex),
      groupIndex: i
    });
  }

  return (
    <div className="space-y-8">
      {/* Physician Headers - Side by side */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* YES Physician */}
        <Card className="bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-600 text-white p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 mr-4" />
            <span className="bg-white text-blue-600 px-4 py-2 rounded-full text-lg font-bold">
              YES: Routine Surveillance is Essential
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

        {/* NO Physician */}
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
      </div>

      {/* Key Arguments Label */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Key Arguments</h2>
      </div>

      {/* Grouped Arguments with ads */}
      <div className="max-w-6xl mx-auto space-y-8">
        {argumentGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-8">
            {/* Argument group - side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* YES Arguments Group */}
              {group.yesArgs.length > 0 && (
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
                  <div className="flex items-center mb-6 gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Yes
                    </span>
                  </div>
                  <div className="space-y-6">
                    {group.yesArgs.map((argument, argIndex) => (
                      <div key={argIndex}>
                        <h4 className="font-semibold text-blue-900 mb-3">{argument.title}</h4>
                        <ul className="space-y-2">
                          {argument.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                              <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                        {argIndex < group.yesArgs.length - 1 && (
                          <div className="border-b border-blue-200 my-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* NO Arguments Group */}
              {group.noArgs.length > 0 && (
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
                  <div className="flex items-center mb-6 gap-3">
                    <XCircle className="h-6 w-6 text-purple-700" />
                    <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      No
                    </span>
                  </div>
                  <div className="space-y-6">
                    {group.noArgs.map((argument, argIndex) => (
                      <div key={argIndex}>
                        <h4 className="font-semibold text-purple-900 mb-3">{argument.title}</h4>
                        <ul className="space-y-2">
                          {argument.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-purple-700 mt-2 mr-3 flex-shrink-0" />
                              <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                        {argIndex < group.noArgs.length - 1 && (
                          <div className="border-b border-purple-200 my-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Add ad after first group (between 1-2 and 3-4) */}
            {groupIndex === 0 && argumentGroups.length > 1 && (
              <div className="py-8">
                <AdPlaceholder size="300x250" className="mx-auto" />
              </div>
            )}
            
            {/* Add ad after every 2 groups for remaining groups */}
            {groupIndex > 0 && (groupIndex + 1) % 2 === 0 && groupIndex < argumentGroups.length - 1 && (
              <div className="py-8">
                <AdPlaceholder size="300x250" className="mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
