import { Card } from "@/components/ui/card";
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
    <div className="space-y-0 md:space-y-0">
      {/* Physician Headers - Side by side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* YES Physician */}
        <Card className="text-white p-6" style={{ background: 'linear-gradient(135deg, #3DC7F5 0%, #2BB4E8 50%, #1A9FDA 100%)' }}>
          <div className="flex justify-center items-center mb-4">
            <span className="bg-white px-4 py-2 rounded-full text-lg font-bold" style={{ color: '#1A9FDA' }}>
              YES: Routine Surveillance is Essential
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <img 
                src={yesPhysician.image} 
                alt={yesPhysician.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/30"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-1 truncate">{yesPhysician.name}</h3>
              <p className="text-white mb-1 leading-tight" style={{ fontSize: '16px' }}>{yesPhysician.credentials}</p>
              <p className="text-white leading-tight" style={{ fontSize: '16px' }}>{yesPhysician.institution}</p>
            </div>
          </div>
        </Card>

        {/* NO Physician */}
        <Card className="text-white p-6" style={{ background: 'linear-gradient(135deg, #F07584 0%, #E85A71 50%, #D73E5E 100%)' }}>
          <div className="flex justify-center items-center mb-4">
            <span className="bg-white px-4 py-2 rounded-full text-lg font-bold" style={{ color: '#D43F5C' }}>
              NO: Selective Surveillance is More Appropriate
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <img 
                src={noPhysician.image} 
                alt={noPhysician.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/30"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-1 truncate">{noPhysician.name}</h3>
              <p className="text-white mb-1 leading-tight" style={{ fontSize: '16px' }}>{noPhysician.credentials}</p>
              <p className="text-white leading-tight" style={{ fontSize: '16px' }}>{noPhysician.institution}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Desktop: Side-by-side columns | Mobile: Alternating arguments */}
      <div className="hidden md:grid md:grid-cols-2 gap-8">
        {/* YES Column - All Arguments (Desktop only) */}
        <div>
          <Card className="border-2 p-6" style={{ background: 'linear-gradient(135deg, rgba(61, 199, 245, 0.1) 0%, rgba(61, 199, 245, 0.2) 100%)', borderColor: '#3DC7F5' }}>
            <div className="mb-6">
              <h2 className="text-xl font-bold" style={{ color: '#1A9FDA' }}>Key Arguments</h2>
            </div>
            <div className="space-y-6">
              {yesArguments.map((argument, index) => (
                <div key={index}>
                  <div className="flex items-center mb-3 gap-3">
                    <span className="text-white px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: '#3DC7F5' }}>
                      Yes
                    </span>
                    <h3 className="text-lg font-bold" style={{ color: '#1A9FDA' }}>
                      {argument.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {argument.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#3DC7F5' }} />
                        <span className="text-lg text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Ad after 2nd argument */}
                  {index === 1 && (
                    <div className="flex justify-center my-8">
                      <AdPlaceholder size="300x250" className="mx-auto" />
                    </div>
                  )}

                  {/* Ad after 5th argument */}
                  {index === 4 && (
                    <div className="flex justify-center my-8">
                      <AdPlaceholder size="300x250" className="mx-auto" />
                    </div>
                  )}

                  {index < yesArguments.length - 1 && (
                    <div className="border-b my-4" style={{ borderColor: '#3DC7F5', opacity: 0.3 }}></div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* NO Column - All Arguments (Desktop only) */}
        <div>
          <Card className="border-2 p-6" style={{ background: 'linear-gradient(135deg, rgba(240, 117, 132, 0.1) 0%, rgba(240, 117, 132, 0.2) 100%)', borderColor: '#F07584' }}>
            <div className="mb-6">
              <h2 className="text-xl font-bold" style={{ color: '#D43F5C' }}>Key Arguments</h2>
            </div>
            <div className="space-y-6">
              {noArguments.map((argument, index) => (
                <div key={index}>
                  <div className="flex items-center mb-3 gap-3">
                    <span className="text-white px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: '#F07584' }}>
                      No
                    </span>
                    <h3 className="text-lg font-bold" style={{ color: '#D43F5C' }}>
                      {argument.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {argument.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#F07584' }} />
                        <span className="text-lg text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Ad after 2nd argument */}
                  {index === 1 && (
                    <div className="flex justify-center my-8">
                      <AdPlaceholder size="300x250" className="mx-auto" />
                    </div>
                  )}

                  {/* Ad after 5th argument */}
                  {index === 4 && (
                    <div className="flex justify-center my-8">
                      <AdPlaceholder size="300x250" className="mx-auto" />
                    </div>
                  )}

                  {index < noArguments.length - 1 && (
                    <div className="border-b my-4" style={{ borderColor: '#F07584', opacity: 0.3 }}></div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile: Alternating YES/NO arguments - Disconnected from physician boxes */}
      <div className="md:hidden space-y-6 mt-20 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Key Arguments</h2>
        {Array.from({ length: Math.max(yesArguments.length, noArguments.length) }).map((_, index) => (
          <div key={index}>
            <div className="space-y-6">
              {/* YES Argument */}
              {yesArguments[index] && (
                <Card className="border-2 p-6" style={{ background: 'linear-gradient(135deg, rgba(61, 199, 245, 0.1) 0%, rgba(61, 199, 245, 0.2) 100%)', borderColor: '#3DC7F5' }}>
                  <div className="flex items-center mb-3 gap-3">
                    <span className="text-white px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#3DC7F5' }}>
                      Yes
                    </span>
                    <h3 className="text-lg font-bold" style={{ color: '#1A9FDA' }}>
                      {yesArguments[index].title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {yesArguments[index].points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#3DC7F5' }} />
                        <span className="text-lg text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* NO Argument */}
              {noArguments[index] && (
                <Card className="border-2 p-6" style={{ background: 'linear-gradient(135deg, rgba(240, 117, 132, 0.1) 0%, rgba(240, 117, 132, 0.2) 100%)', borderColor: '#F07584' }}>
                  <div className="flex items-center mb-3 gap-3">
                    <span className="text-white px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F07584' }}>
                      No
                    </span>
                    <h3 className="text-lg font-bold" style={{ color: '#D43F5C' }}>
                      {noArguments[index].title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {noArguments[index].points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#F07584' }} />
                        <span className="text-lg text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>

            {/* Ad after each YES/NO pair - Outside the boxes */}
            <div className="flex justify-center py-8">
              <AdPlaceholder size="300x250" className="mx-auto" />
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}