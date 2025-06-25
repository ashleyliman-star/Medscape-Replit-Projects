import { Card } from "@/components/ui/card";
import AdPlaceholder from "./ad-placeholder";
import { ThumbsUp, ThumbsDown } from "lucide-react";

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
      {/* Position Headers */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* YES Position */}
        <Card className="text-white p-6" style={{ background: 'linear-gradient(135deg, #3DC7F5 0%, #2BB4E8 50%, #1A9FDA 100%)' }}>
          <div className="flex items-center justify-center mb-4">
            <ThumbsUp className="mr-3 h-8 w-8" />
            <h2 className="font-bold text-2xl md:text-3xl text-white">YES: Routine Surveillance is Worth It</h2>
          </div>
        </Card>

        {/* NO Position */}
        <Card className="text-white p-6" style={{ background: 'linear-gradient(135deg, #F07584 0%, #E85A70 50%, #D43F5C 100%)' }}>
          <div className="flex items-center justify-center mb-4">
            <ThumbsDown className="mr-3 h-8 w-8" />
            <h2 className="font-bold text-2xl md:text-3xl text-white">NO: Routine Surveillance is Not Worth It</h2>
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
                      <span className="text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-semibold mt-0.5" style={{ backgroundColor: '#3DC7F5' }}>
                        Yes
                      </span>
                      <h4 className="font-semibold text-xl" style={{ color: '#1A9FDA' }}>{yesArguments[index].title}</h4>
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
                      <span className="text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-semibold mt-0.5" style={{ backgroundColor: '#F07584' }}>
                        No
                      </span>
                      <h4 className="font-semibold text-xl" style={{ color: '#D43F5C' }}>{noArguments[index].title}</h4>
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
                    <span className="text-white px-2 py-1 rounded-full text-xs font-semibold mt-0.5" style={{ backgroundColor: '#3DC7F5' }}>
                      Yes
                    </span>
                    <h4 className="font-semibold text-xl" style={{ color: '#1A9FDA' }}>{yesArguments[index].title}</h4>
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
                    <span className="text-white px-2 py-1 rounded-full text-xs font-semibold mt-0.5" style={{ backgroundColor: '#F07584' }}>
                      No
                    </span>
                    <h4 className="font-semibold text-xl" style={{ color: '#D43F5C' }}>{noArguments[index].title}</h4>
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

            {/* Ad after every pair of YES/NO arguments */}
            <div className="flex justify-center py-8">
              <AdPlaceholder size="300x250" className="mx-auto" />
            </div>
          </div>
        ))}
      </div>

      {/* Related Articles Section */}
      <div className="mt-16 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">What to Read Next on Medscape</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <h4 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              Breast Cancer Screening Guidelines: What's Changed in 2024
            </h4>
          </div>
          <div className="border-b border-gray-200 pb-3">
            <h4 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              MRI vs Mammography: When to Use Each for High-Risk Patients
            </h4>
          </div>
          <div className="border-b border-gray-200 pb-3">
            <h4 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              False Positives in Breast Screening: Impact on Patient Psychology
            </h4>
          </div>
          <div className="border-b border-gray-200 pb-3">
            <h4 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              Cost-Effectiveness Analysis of Breast Cancer Surveillance Programs
            </h4>
          </div>
          <div className="border-b border-gray-200 pb-3">
            <h4 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              Personalized Screening: Risk Stratification in Breast Cancer Prevention
            </h4>
          </div>
        </div>
      </div>

    </div>
  );
}