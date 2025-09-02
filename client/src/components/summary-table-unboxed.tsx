interface Argument {
  title: string;
  points: string[];
}

interface SummaryTableUnboxedProps {
  yesArguments: Argument[];
  noArguments: Argument[];
}

export default function SummaryTableUnboxed({ yesArguments, noArguments }: SummaryTableUnboxedProps) {
  // Get main argument titles from both sides
  const yesPoints = yesArguments.map(arg => arg.title);
  const noPoints = noArguments.map(arg => arg.title);

  return (
    <div className="mb-8 md:mb-12 md:mt-8">
      <h2 className="font-bold text-gray-800 mb-6 md:mb-8 text-center" style={{ fontSize: '22px' }}>
        <span className="md:text-3xl">Summary of Key Points</span>
      </h2>
      
      {/* Mobile Layout */}
      <div className="md:hidden space-y-6">
        {/* YES Side Summary */}
        <div>
          <div className="flex items-center mb-4">
            <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#3D8AF5' }}>
              YES
            </div>
            <h3 className="font-bold md:text-2xl text-xl" style={{ color: '#3D8AF5' }}>
              Early Intervention Is Best
            </h3>
          </div>
          <ul className="space-y-2">
            {yesPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-black"></span>
                <span className="text-gray-700 leading-relaxed flex-1 text-base md:text-xl">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NO Side Summary */}
        <div>
          <div className="flex items-center mb-4">
            <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#C20A20' }}>
              NO
            </div>
            <h3 className="font-bold md:text-2xl text-xl" style={{ color: '#C20A20' }}>
              Clinical Surveillance Is More Appropriate
            </h3>
          </div>
          <ul className="space-y-2">
            {noPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-black"></span>
                <span className="text-gray-700 leading-relaxed flex-1 text-base md:text-xl">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex relative max-w-6xl mx-auto">
        {/* YES Side Summary */}
        <div className="flex-1" style={{ paddingLeft: '60px', paddingRight: '20px' }}>
          <div className="flex items-center mb-6">
            <div className="mr-3 text-white text-sm font-bold px-3 py-2 rounded" style={{ backgroundColor: '#3D8AF5' }}>
              YES
            </div>
            <h3 className="font-bold md:text-2xl text-xl" style={{ color: '#3D8AF5' }}>
              Early Intervention Is Best
            </h3>
          </div>
          <ul className="space-y-3">
            {yesPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-black"></span>
                <span className="text-gray-700 leading-relaxed flex-1 text-base md:text-xl">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vertical divider line */}
        <div className="w-px bg-gray-300 ml-2 mr-4"></div>
        
        {/* NO Side Summary */}
        <div className="flex-1" style={{ paddingLeft: '20px' }}>
          <div className="flex items-center mb-6">
            <div className="mr-3 text-white text-sm font-bold px-3 py-2 rounded" style={{ backgroundColor: '#C20A20' }}>
              NO
            </div>
            <h3 className="font-bold md:text-2xl text-xl" style={{ color: '#C20A20' }}>
              Clinical Surveillance Is More Appropriate
            </h3>
          </div>
          <ul className="space-y-3">
            {noPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-black"></span>
                <span className="text-gray-700 leading-relaxed flex-1 text-base md:text-xl">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}