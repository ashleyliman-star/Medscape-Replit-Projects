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
              className="w-24 h-24 rounded-full border-3 border-white mr-4"
            />
            <div>
              <h2 className="font-bold text-3xl mb-2 text-blue-100">YES: Routine Surveillance is Worth It</h2>
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
              className="w-24 h-24 rounded-full border-3 border-white mr-4"
            />
            <div>
              <h2 className="font-bold text-3xl mb-2 text-purple-100">NO: Routine Surveillance is Not Worth It</h2>
              <h3 className="font-bold text-xl mb-1">{noPhysician.name}</h3>
              <p className="text-purple-100 text-sm">{noPhysician.credentials}</p>
              <p className="text-purple-100 text-sm">{noPhysician.institution}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Arguments sections for each physician - Desktop only */}
      <div className="hidden md:block mb-8">
        {Array.from({ length: Math.max(yesArguments.length, noArguments.length) }).map((_, index) => (
          <div key={index}>
            {/* Arguments row */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              {/* YES Key Arguments */}
              <div>
                {index === 0 && <h3 className="text-xl font-bold text-gray-800 mb-4">Key Arguments</h3>}
                {yesArguments[index] && (
                  <div>
                    <div className="flex items-start mb-3 gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold mt-0.5">
                        Yes
                      </span>
                      <h4 className="font-semibold text-xl text-blue-800">{yesArguments[index].title}</h4>
                    </div>
                    <ul className="space-y-2 ml-8">
                      {yesArguments[index].points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                          <span className="text-base md:text-lg text-gray-700 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* NO Key Arguments */}
              <div>
                {index === 0 && <h3 className="text-xl font-bold text-gray-800 mb-4">Key Arguments</h3>}
                {noArguments[index] && (
                  <div>
                    <div className="flex items-start mb-3 gap-3">
                      <XCircle className="h-5 w-5 text-purple-700 mt-0.5 flex-shrink-0" />
                      <span className="bg-purple-700 text-white px-2 py-1 rounded-full text-xs font-semibold mt-0.5">
                        No
                      </span>
                      <h4 className="font-semibold text-xl text-purple-800">{noArguments[index].title}</h4>
                    </div>
                    <ul className="space-y-2 ml-8">
                      {noArguments[index].points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                          <span className="text-base md:text-lg text-gray-700 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Centered ad after every 2 arguments (index 1, 3, 5, etc.) */}
            {index % 2 === 1 && (
              <div className="flex justify-center py-8">
                <AdPlaceholder size="300x250" className="mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Alternating YES/NO arguments */}
      <div className="md:hidden mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Key Arguments</h3>
        {Array.from({ length: Math.max(yesArguments.length, noArguments.length) }).map((_, index) => (
          <div key={index}>
            <div className="space-y-6 mb-6">
              {/* YES Argument */}
              {yesArguments[index] && (
                <div>
                  <div className="flex items-start mb-3 gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold mt-0.5">
                      Yes
                    </span>
                    <h4 className="font-semibold text-xl text-blue-800">{yesArguments[index].title}</h4>
                  </div>
                  <ul className="space-y-2 ml-8">
                    {yesArguments[index].points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-base md:text-lg text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* NO Argument */}
              {noArguments[index] && (
                <div>
                  <div className="flex items-start mb-3 gap-3">
                    <XCircle className="h-5 w-5 text-purple-700 mt-0.5 flex-shrink-0" />
                    <span className="bg-purple-700 text-white px-2 py-1 rounded-full text-xs font-semibold mt-0.5">
                      No
                    </span>
                    <h4 className="font-semibold text-xl text-purple-800">{noArguments[index].title}</h4>
                  </div>
                  <ul className="space-y-2 ml-8">
                    {noArguments[index].points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-base md:text-lg text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Centered ad after every 2 arguments (index 1, 3, 5, etc.) */}
            {index % 2 === 1 && (
              <div className="flex justify-center py-8">
                <AdPlaceholder size="300x250" className="mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>


    </div>
  );
}