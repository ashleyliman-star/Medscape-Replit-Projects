import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import AdPlaceholder from "./ad-placeholder";

interface Argument {
  title: string;
  points: string[];
}

interface SideBySideArgumentsProps {
  yesArguments: Argument[];
  noArguments: Argument[];
}

export default function SideBySideArguments({ yesArguments, noArguments }: SideBySideArgumentsProps) {
  const maxArgs = Math.max(yesArguments.length, noArguments.length);
  
  return (
    <div className="space-y-8">
      {Array.from({ length: maxArgs }, (_, index) => (
        <div key={index}>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* YES Argument */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
              {yesArguments[index] && (
                <>
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Yes
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 mb-4">
                    {yesArguments[index].title}
                  </h3>
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
                  <div className="flex items-center mb-4">
                    <XCircle className="h-6 w-6 text-purple-700 mr-3" />
                    <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      No
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-purple-800 mb-4">
                    {noArguments[index].title}
                  </h3>
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
              <AdPlaceholder size="728x90" className="w-full max-w-3xl" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}