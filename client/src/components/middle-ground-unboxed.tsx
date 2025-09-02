import { Scale } from "lucide-react";

export default function MiddleGroundUnboxed() {
  return (
    <section className="mb-12">
      <h2 className="font-bold text-gray-900 mb-6 text-center" style={{ fontSize: '28px' }}>
        <div className="flex items-center justify-center gap-0.5 md:gap-2">
          <Scale className="h-6 w-6 flex-shrink-0" style={{ color: '#064AA7' }} />
          <span className="text-center">Middle Ground and Evolving Perspectives</span>
        </div>
      </h2>
      <div className="max-w-4xl mx-auto">
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: '#064AA7' }} />
            <span style={{ fontSize: '20px' }}>Authors of a review paper in JACC suggest TAVR or SAVR for patients older than 75 years, and propose waiting for more data before making final recommendations for younger patients.</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: '#064AA7' }} />
            <span style={{ fontSize: '20px' }}>Some surgeons who favor early intervention do not consider the two approaches equivalent given there are more long-term data supporting surgery than percutaneous intervention.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}