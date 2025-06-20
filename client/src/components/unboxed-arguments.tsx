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

interface UnboxedArgumentsProps {
  yesArguments: Argument[];
  noArguments: Argument[];
  yesPhysician: Physician;
  noPhysician: Physician;
}

export default function UnboxedArguments({ yesArguments, noArguments, yesPhysician, noPhysician }: UnboxedArgumentsProps) {
  // Create pairs for desktop and alternating pattern for mobile
  const argumentPairs = [];
  const maxLength = Math.max(yesArguments.length, noArguments.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (yesArguments[i] && noArguments[i]) {
      argumentPairs.push({
        yes: yesArguments[i],
        no: noArguments[i],
        pairIndex: i
      });
    } else if (yesArguments[i]) {
      argumentPairs.push({
        yes: yesArguments[i],
        no: null,
        pairIndex: i
      });
    } else if (noArguments[i]) {
      argumentPairs.push({
        yes: null,
        no: noArguments[i],
        pairIndex: i
      });
    }
  }

  // Create mobile alternating pattern
  const mobileArguments = [];
  for (let i = 0; i < maxLength; i++) {
    if (yesArguments[i]) {
      mobileArguments.push({ type: 'yes', argument: yesArguments[i], index: i });
    }
    if (noArguments[i]) {
      mobileArguments.push({ type: 'no', argument: noArguments[i], index: i });
    }
  }

  return (
    <div className="space-y-8">
      {/* Physician Headers */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* YES Physician */}
        <Card className="bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-600 text-white p-6">
          <div className="flex items-center mb-4">
            <img 
              src={yesPhysician.image} 
              alt={yesPhysician.name}
              className="w-16 h-16 rounded-full border-3 border-white mr-4"
            />
            <div>
              <h3 className="font-bold text-xl mb-1">{yesPhysician.name}</h3>
              <p className="text-blue-100 text-sm">{yesPhysician.credentials}</p>
              <p className="text-blue-100 text-sm">{yesPhysician.institution}</p>
            </div>
          </div>
        </Card>

        {/* NO Physician */}
        <Card className="bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white p-6">
          <div className="flex items-center mb-4">
            <img 
              src={noPhysician.image} 
              alt={noPhysician.name}
              className="w-16 h-16 rounded-full border-3 border-white mr-4"
            />
            <div>
              <h3 className="font-bold text-xl mb-1">{noPhysician.name}</h3>
              <p className="text-purple-100 text-sm">{noPhysician.credentials}</p>
              <p className="text-purple-100 text-sm">{noPhysician.institution}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Arguments sections for each physician */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* YES Key Arguments */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Key Arguments</h3>
          <div className="space-y-6">
            {yesArguments.map((argument, index) => (
              <div key={index}>
                <div className="flex items-start mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900">{argument.title}</h4>
                </div>
                <ul className="space-y-2 ml-8">
                  {argument.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* NO Key Arguments */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Key Arguments</h3>
          <div className="space-y-6">
            {noArguments.map((argument, index) => (
              <div key={index}>
                <div className="flex items-start mb-3">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900">{argument.title}</h4>
                </div>
                <ul className="space-y-2 ml-8">
                  {argument.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Side by side pairs */}
      <div className="hidden md:block space-y-12">
        {argumentPairs.map((pair, pairIndex) => (
          <div key={pairIndex}>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* YES Argument */}
              {pair.yes && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800">
                      {pair.yes.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 pl-11">
                    {pair.yes.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* NO Argument */}
              {pair.no && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="h-8 w-8 text-red-600" />
                    <h3 className="text-xl font-bold text-red-800">
                      {pair.no.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 pl-11">
                    {pair.no.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-red-600 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Ad after every 2 pairs */}
            {(pairIndex + 1) % 2 === 0 && pairIndex < argumentPairs.length - 1 && (
              <div className="flex justify-center mb-8">
                <AdPlaceholder size="728x90" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Layout - Alternating arguments */}
      <div className="block md:hidden space-y-8">
        {mobileArguments.map((item, index) => (
          <div key={`mobile-${item.type}-${item.index}`}>
            <div className="space-y-4">
              {item.type === 'yes' ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800">
                      {item.argument.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 pl-11">
                    {item.argument.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="h-8 w-8 text-red-600" />
                    <h3 className="text-xl font-bold text-red-800">
                      {item.argument.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 pl-11">
                    {item.argument.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-red-600 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            
            {/* Ad after every 2 arguments on mobile */}
            {(index + 1) % 2 === 0 && index < mobileArguments.length - 1 && (
              <div className="flex justify-center mt-8">
                <AdPlaceholder size="300x250" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}