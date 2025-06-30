import { Scale } from "lucide-react";

export default function MiddleGroundUnboxed() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 md:gap-1">
          <Scale className="h-6 w-6 flex-shrink-0" style={{ color: '#064AA7' }} />
          <span className="text-center">Middle Ground and Evolving Perspectives</span>
        </div>
      </h2>
      <div className="max-w-4xl mx-auto">
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: '#064AA7' }} />
            <span className="text-base md:text-lg">Cancer type and patient factors may matter, and clinicians need to evaluate guideline recommendations and communicate the pros and cons of routine surveillance to patients.</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: '#064AA7' }} />
            <span className="text-base md:text-lg">As surveillance technology or cancer treatments improve, the value of routine screening in this population may also evolve.</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: '#064AA7' }} />
            <span className="text-base md:text-lg">Detecting minimal residual disease through ctDNA testing could offer a less invasive and less stressful way to monitor patients for recurrences, but it's still unclear whether detecting ctDNA in these blood tests helps patients live longer or better.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}