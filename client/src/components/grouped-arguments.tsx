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

      {/* Arguments 1-2 Side by Side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* YES Column - Arguments 1-2 */}
        <div>
          {yesArguments.slice(0, 2).length > 0 && (
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-800">Key Arguments</h2>
              </div>
              <div className="space-y-6">
                {yesArguments.slice(0, 2).map((argument, index) => (
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
                    {index < yesArguments.slice(0, 2).length - 1 && (
                      <div className="border-b border-blue-200 my-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* NO Column - Arguments 1-2 */}
        <div>
          {noArguments.slice(0, 2).length > 0 && (
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-purple-800">Key Arguments</h2>
              </div>
              <div className="space-y-6">
                {noArguments.slice(0, 2).map((argument, index) => (
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
                    {index < noArguments.slice(0, 2).length - 1 && (
                      <div className="border-b border-purple-200 my-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Ad between arguments 1-2 and 3-4 */}
      <div className="flex justify-center py-8">
        <AdPlaceholder size="300x250" className="mx-auto" />
      </div>

      {/* Arguments 3-4 Side by Side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* YES Column - Arguments 3-4 */}
        <div>
          {yesArguments.slice(2, 4).length > 0 && (
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
              <div className="space-y-6">
                {yesArguments.slice(2, 4).map((argument, index) => (
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
                    {index < yesArguments.slice(2, 4).length - 1 && (
                      <div className="border-b border-blue-200 my-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* NO Column - Arguments 3-4 */}
        <div>
          {noArguments.slice(2, 4).length > 0 && (
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
              <div className="space-y-6">
                {noArguments.slice(2, 4).map((argument, index) => (
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
                    {index < noArguments.slice(2, 4).length - 1 && (
                      <div className="border-b border-purple-200 my-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Ad between arguments 3-4 and argument 5 */}
      {(yesArguments.length > 4 || noArguments.length > 4) && (
        <div className="flex justify-center py-8">
          <AdPlaceholder size="300x250" className="mx-auto" />
        </div>
      )}

      {/* Arguments 5+ Side by Side */}
      {(yesArguments.slice(4).length > 0 || noArguments.slice(4).length > 0) && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* YES Column - Arguments 5+ */}
          <div className="space-y-6">
            {yesArguments.slice(4).map((argument, index) => (
              <Card key={index + 4} className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
                <div className="flex items-center mb-4 gap-3">
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
              </Card>
            ))}
          </div>

          {/* NO Column - Arguments 5+ */}
          <div className="space-y-6">
            {noArguments.slice(4).map((argument, index) => (
              <Card key={index + 4} className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
                <div className="flex items-center mb-4 gap-3">
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
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}