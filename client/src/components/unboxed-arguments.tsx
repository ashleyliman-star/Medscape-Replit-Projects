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
      <div className="text-center mb-4 md:mb-8">
        <h2 className="font-bold text-gray-900" style={{ fontSize: '22px' }}>
          <span className="hidden md:inline text-gray-900 font-bold" style={{ fontSize: '28px' }}>Key Arguments</span>
          <span className="md:hidden">Key Arguments</span>
        </h2>
      </div>

      {/* Position Headers - Desktop */}
      <div className="hidden md:grid md:grid-cols-2 gap-20 mb-8">
        {/* YES Position */}
        <div className="flex items-center">
          <div className="mr-3 text-white text-sm font-bold px-3 py-2 rounded" style={{ backgroundColor: '#3D8AF5' }}>
            YES
          </div>
          <h2 className="font-bold" style={{ color: '#3D8AF5', fontSize: '24px' }}>Early Intervention Is Best</h2>
        </div>

        {/* NO Position */}
        <div className="flex items-center">
          <div className="mr-3 text-white text-sm font-bold px-3 py-2 rounded" style={{ backgroundColor: '#C20A20' }}>
            NO
          </div>
          <h2 className="font-bold" style={{ color: '#C20A20', fontSize: '24px' }}>Clinical Surveillance Is More Appropriate</h2>
        </div>
      </div>



      {/* Key Arguments sections - Desktop */}
      <div className="hidden md:block mb-8">
        {Array.from({ length: Math.max(yesArguments.length, noArguments.length) }).map((_, index) => (
          <div key={index}>
            {/* Arguments row */}
            <div className={`grid grid-cols-2 gap-20 mb-2`}>
              {/* YES Arguments */}
              <div>
                {yesArguments[index] && (
                  <div className="mb-6 p-4 border-l-4 relative" style={{ backgroundColor: 'rgba(61, 138, 245, 0.1)', borderLeftColor: '#3D8AF5' }}>
                    <h4 className="font-semibold text-black mb-3" style={{ fontSize: '22px' }}>{yesArguments[index].title}</h4>
                    <div>
                      {yesArguments[index].points.map((point, pointIndex) => (
                        <p key={pointIndex} className="text-gray-700 leading-relaxed" style={{ fontSize: '20px' }}>{point}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* NO Arguments */}
              <div>
                {noArguments[index] && (
                  <div className="mb-6 p-4 border-l-4 relative" style={{ backgroundColor: 'rgba(194, 10, 32, 0.1)', borderLeftColor: '#C20A20' }}>
                    <h4 className="font-semibold text-black mb-3" style={{ fontSize: '22px' }}>{noArguments[index].title}</h4>
                    <div>
                      {noArguments[index].points.map((point, pointIndex) => (
                        <p key={pointIndex} className="text-gray-700 leading-relaxed" style={{ fontSize: '20px' }}>{point}</p>
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

      {/* Mobile: Grouped YES/NO arguments */}
      <div className="md:hidden mb-8">
        {/* YES Position Header and Arguments */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="mr-3 text-white text-sm font-bold px-3 py-2 rounded" style={{ backgroundColor: '#3D8AF5' }}>
              YES
            </div>
            <h2 className="font-bold md:text-2xl text-xl" style={{ color: '#3D8AF5' }}>Early Intervention Is Best</h2>
          </div>

          {/* All YES Arguments */}
          {yesArguments.map((argument, index) => (
            <div key={`yes-${index}`}>
              <div className="mb-6 p-4 border-l-4 relative" style={{ backgroundColor: 'rgba(61, 138, 245, 0.15)', borderLeftColor: '#3D8AF5' }}>
                <h4 className="font-semibold text-black mb-3 text-lg md:text-xl">{argument.title}</h4>
                <div>
                  {argument.points.map((point, pointIndex) => (
                    <p key={pointIndex} className="text-gray-700 leading-relaxed text-base md:text-xl">{point}</p>
                  ))}
                </div>
              </div>
              {/* Ad after every 2 arguments */}
              {(index + 1) % 2 === 0 && (
                <div className="flex justify-center pt-1 pb-4">
                  <AdPlaceholder size="300x250" className="mx-auto" position={Math.floor((index + 1) / 2)} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* NO Position Header and Arguments */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="mr-3 text-white text-sm font-bold px-3 py-2 rounded" style={{ backgroundColor: '#C20A20' }}>
              NO
            </div>
            <h2 className="font-bold md:text-2xl text-xl" style={{ color: '#C20A20' }}>Clinical Surveillance Is More Appropriate</h2>
          </div>

          {/* All NO Arguments */}
          {noArguments.map((argument, index) => (
            <div key={`no-${index}`}>
              <div className="mb-6 p-4 border-l-4 relative" style={{ backgroundColor: 'rgba(194, 10, 32, 0.15)', borderLeftColor: '#C20A20' }}>
                <h4 className="font-semibold text-black mb-3 text-lg md:text-xl">{argument.title}</h4>
                <div>
                  {argument.points.map((point, pointIndex) => (
                    <p key={pointIndex} className="text-gray-700 leading-relaxed text-base md:text-xl">{point}</p>
                  ))}
                </div>
              </div>
              {/* Ad after every 2 arguments */}
              {(index + 1) % 2 === 0 && (
                <div className="flex justify-center pt-1 pb-4">
                  <AdPlaceholder size="300x250" className="mx-auto" position={Math.floor(yesArguments.length / 2) + Math.floor((index + 1) / 2) + 1} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}