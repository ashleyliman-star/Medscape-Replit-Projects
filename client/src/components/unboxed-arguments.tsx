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
  startingAdPosition?: number;
}

export default function UnboxedArguments({ yesArguments, noArguments, yesPhysician, noPhysician, startingAdPosition = 2 }: UnboxedArgumentsProps) {
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
      {/* Key Arguments Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Key Arguments</h2>
      </div>

      {/* Position Headers - Desktop */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 mb-8">
        {/* YES Position */}
        <div className="flex items-center">
          <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#3D8AF5' }}>
            YES
          </div>
          <h2 className="font-bold text-lg" style={{ color: '#3D8AF5' }}>Early Intervention Is Best</h2>
        </div>

        {/* NO Position */}
        <div className="flex items-center">
          <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#C20A20' }}>
            NO
          </div>
          <h2 className="font-bold text-lg" style={{ color: '#C20A20' }}>Clinical Surveillance Is More Appropriate</h2>
        </div>
      </div>



      {/* Key Arguments sections - Desktop */}
      <div className="hidden md:block mb-8">
        {Array.from({ length: Math.max(yesArguments.length, noArguments.length) }).map((_, index) => (
          <div key={index}>
            {/* Arguments row */}
            <div className={`grid grid-cols-2 gap-8 ${(index === 1 || index === 3) ? 'mb-4' : 'mb-8'}`}>
              {/* YES Arguments */}
              <div>
                {yesArguments[index] && (
                  <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(61, 138, 245, 0.05)' }}>
                    <div className="flex items-start mb-3 gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3D8AF5' }}>
                        <span className="text-white text-xs font-bold">YES</span>
                      </div>
                      <h4 className="font-semibold text-lg text-black">{yesArguments[index].title}</h4>
                    </div>
                    <div className="ml-9">
                      {yesArguments[index].points.map((point, pointIndex) => (
                        <p key={pointIndex} className="text-base text-gray-700 leading-relaxed">{point}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* NO Arguments */}
              <div>
                {noArguments[index] && (
                  <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(194, 10, 32, 0.05)' }}>
                    <div className="flex items-start mb-3 gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C20A20' }}>
                        <span className="text-white text-xs font-bold">NO</span>
                      </div>
                      <h4 className="font-semibold text-lg text-black">{noArguments[index].title}</h4>
                    </div>
                    <div className="ml-9">
                      {noArguments[index].points.map((point, pointIndex) => (
                        <p key={pointIndex} className="text-base text-gray-700 leading-relaxed">{point}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Centered ad after arguments 2 and 4 for better spacing */}
            {(index === 1 || index === 3) && (
              <div className="col-span-2 flex justify-center my-8">
                <AdPlaceholder size="responsive-desktop-banner" className="mx-auto" position={index === 1 ? 2 : 3} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Position Headers */}
      <div className="md:hidden mb-8">
        <div className="space-y-4 mb-6">
          {/* YES Position */}
          <div className="flex items-center">
            <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#3D8AF5' }}>
              YES
            </div>
            <h2 className="font-bold text-lg" style={{ color: '#3D8AF5' }}>Early Intervention Is Best</h2>
          </div>

          {/* NO Position */}
          <div className="flex items-center">
            <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#C20A20' }}>
              NO
            </div>
            <h2 className="font-bold text-lg" style={{ color: '#C20A20' }}>Clinical Surveillance Is More Appropriate</h2>
          </div>
        </div>

        {Array.from({ length: Math.max(yesArguments.length, noArguments.length) }).map((_, index) => (
          <div key={index}>
            <div className="space-y-6 mb-6">
              {/* YES Argument */}
              {yesArguments[index] && (
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(61, 138, 245, 0.05)' }}>
                  <div className="flex items-start mb-3 gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3D8AF5' }}>
                      <span className="text-white text-xs font-bold">YES</span>
                    </div>
                    <h4 className="font-semibold text-lg text-black">{yesArguments[index].title}</h4>
                  </div>
                  <div className="ml-9">
                    {yesArguments[index].points.map((point, pointIndex) => (
                      <p key={pointIndex} className="text-base text-gray-700 leading-relaxed">{point}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* NO Argument */}
              {noArguments[index] && (
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(194, 10, 32, 0.05)' }}>
                  <div className="flex items-start mb-3 gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C20A20' }}>
                      <span className="text-white text-xs font-bold">NO</span>
                    </div>
                    <h4 className="font-semibold text-lg text-black">{noArguments[index].title}</h4>
                  </div>
                  <div className="ml-9">
                    {noArguments[index].points.map((point, pointIndex) => (
                      <p key={pointIndex} className="text-base text-gray-700 leading-relaxed">{point}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ad after every pair of YES/NO arguments */}
            <div className="flex justify-center py-8">
              <AdPlaceholder size="300x250" className="mx-auto" position={1 + index} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}