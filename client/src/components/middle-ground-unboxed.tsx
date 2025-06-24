import { Scale } from "lucide-react";

export default function MiddleGroundUnboxed() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <Scale className="h-14 w-14 md:mr-3 md:h-6 md:w-6" style={{ color: '#064AA7' }} />
        <span className="-ml-2 md:ml-0">Middle Ground and Evolving Perspectives</span>
      </h2>
      <div className="max-w-4xl mx-auto">
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: '#064AA7' }} />
            <span className="text-base md:text-lg">Personalized surveillance based on recurrence risk, age, genetic factors, and treatment history may offer a better risk-benefit balance.</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: '#064AA7' }} />
            <span className="text-base md:text-lg">Newer models are being tested to combine patient-reported outcomes, biomarkers, and telehealth to reduce unnecessary in-person visits.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}