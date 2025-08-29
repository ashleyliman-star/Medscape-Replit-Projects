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
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
        Summary of Key Points
      </h2>
      
      {/* Mobile Layout */}
      <div className="md:hidden space-y-6">
        {/* YES Side Summary */}
        <div>
          <div className="flex items-center mb-4">
            <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#3D8AF5' }}>
              YES
            </div>
            <h3 className="text-lg font-bold" style={{ color: '#3D8AF5' }}>
              Early Intervention Is Best
            </h3>
          </div>
          <ul className="space-y-2">
            {yesPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-black"></span>
                <span className="text-gray-700 leading-relaxed flex-1 text-base">{point}</span>
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
            <h3 className="text-lg font-bold" style={{ color: '#C20A20' }}>
              Clinical Surveillance Is More Appropriate
            </h3>
          </div>
          <ul className="space-y-2">
            {noPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-black"></span>
                <span className="text-gray-700 leading-relaxed flex-1 text-base">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 relative">
        {/* Vertical divider line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>
        
        {/* YES Side Summary */}
        <div className="pr-4">
          <div className="flex items-center mb-6">
            <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#3D8AF5' }}>
              YES
            </div>
            <h3 className="text-xl font-bold" style={{ color: '#3D8AF5' }}>
              Early Intervention Is Best
            </h3>
          </div>
          <ul className="space-y-3">
            {yesPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-black"></span>
                <span className="text-gray-700 leading-relaxed flex-1 text-base">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NO Side Summary */}
        <div className="pl-4">
          <div className="flex items-center mb-6">
            <div className="mr-3 text-white text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#C20A20' }}>
              NO
            </div>
            <h3 className="text-xl font-bold" style={{ color: '#C20A20' }}>
              Clinical Surveillance Is More Appropriate
            </h3>
          </div>
          <ul className="space-y-3">
            {noPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-black"></span>
                <span className="text-gray-700 leading-relaxed flex-1 text-base">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}