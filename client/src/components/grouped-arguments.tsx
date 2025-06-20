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

interface GroupedArgumentsProps {
  yesArguments: Argument[];
  noArguments: Argument[];
  yesPhysician: Physician;
  noPhysician: Physician;
}

export default function GroupedArguments({ yesArguments, noArguments, yesPhysician, noPhysician }: GroupedArgumentsProps) {
  const maxArgs = Math.max(yesArguments.length, noArguments.length);

  return (
    <div className="space-y-8">
      {/* Physician Headers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

      {/* Mobile: Alternating Arguments */}
      <div className="lg:hidden space-y-8">
        {Array.from({ length: maxArgs }, (_, index) => (
          <div key={`mobile-${index}`} className="space-y-6">
            {/* YES Argument */}
            {yesArguments[index] && (
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
                {index === 0 && (
                  <h3 className="text-lg font-bold text-blue-800 mb-4 text-center">Key Arguments - YES</h3>
                )}
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
              </Card>
            )}

            {/* NO Argument */}
            {noArguments[index] && (
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
                {index === 0 && (
                  <h3 className="text-lg font-bold text-purple-800 mb-4 text-center">Key Arguments - NO</h3>
                )}
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
              </Card>
            )}

            {/* Mobile Ad after each pair */}
            {index < maxArgs - 1 && (
              <div className="flex justify-center my-8">
                <AdPlaceholder size="300x250" className="w-full max-w-sm" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: Grouped Arguments */}
      <div className="hidden lg:block">
        {Array.from({ length: Math.ceil(maxArgs / 2) }, (_, groupIndex) => {
          const isLastGroup = groupIndex === Math.ceil(maxArgs / 2) - 1;
          const hasOddTotal = maxArgs % 2 === 1;
          const showSingleArgument = isLastGroup && hasOddTotal;
          
          return (
            <div key={groupIndex}>
              <div className="grid lg:grid-cols-2 gap-6">
                {/* YES Arguments Group */}
                <Card className="bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-600 text-white p-6">
                  {groupIndex === 0 && (
                    <h3 className="text-xl font-bold mb-6 text-center">Key Arguments - YES</h3>
                  )}
                  {showSingleArgument ? (
                    // Single argument for last odd group
                    yesArguments[groupIndex * 2] && (
                      <div>
                        <div className="flex items-center mb-4 flex-wrap gap-3">
                          <CheckCircle className="h-6 w-6 text-white" />
                          <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                            Yes
                          </span>
                          <h3 className="text-lg font-bold text-white">
                            {yesArguments[groupIndex * 2].title}
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {yesArguments[groupIndex * 2].points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-white mt-2 mr-3 flex-shrink-0" />
                              <span className="text-sm text-white leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ) : (
                    // Two arguments in one box
                    <div className="space-y-6">
                      {[0, 1].map((offset) => {
                        const argIndex = groupIndex * 2 + offset;
                        const argument = yesArguments[argIndex];
                        return argument ? (
                          <div key={argIndex}>
                            <div className="flex items-center mb-4 flex-wrap gap-3">
                              <CheckCircle className="h-6 w-6 text-white" />
                              <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                Yes
                              </span>
                              <h3 className="text-lg font-bold text-white">
                                {argument.title}
                              </h3>
                            </div>
                            <ul className="space-y-3">
                              {argument.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start">
                                  <div className="w-2 h-2 rounded-full bg-white mt-2 mr-3 flex-shrink-0" />
                                  <span className="text-sm text-white leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                            {offset === 0 && yesArguments[argIndex + 1] && (
                              <div className="border-b border-white/30 my-6"></div>
                            )}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </Card>

                {/* NO Arguments Group */}
                <Card className="bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white p-6">
                  {showSingleArgument ? (
                    // Single argument for last odd group
                    noArguments[groupIndex * 2] && (
                      <div>
                        <div className="flex items-center mb-4 flex-wrap gap-3">
                          <XCircle className="h-6 w-6 text-purple-700" />
                          <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            No
                          </span>
                          <h3 className="text-lg font-bold text-purple-800">
                            {noArguments[groupIndex * 2].title}
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {noArguments[groupIndex * 2].points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-purple-700 mt-2 mr-3 flex-shrink-0" />
                              <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ) : (
                    // Two arguments in one box
                    <div className="space-y-6">
                      {[0, 1].map((offset) => {
                        const argIndex = groupIndex * 2 + offset;
                        const argument = noArguments[argIndex];
                        return argument ? (
                          <div key={argIndex}>
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
                            {offset === 0 && noArguments[argIndex + 1] && (
                              <div className="border-b border-purple-200 my-6"></div>
                            )}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </Card>
              </div>

              {/* Desktop Ad after each argument group */}
              {groupIndex < Math.ceil(maxArgs / 2) - 1 && (
                <div className="flex justify-center my-8">
                  <AdPlaceholder size="300x250" className="w-full max-w-sm" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}