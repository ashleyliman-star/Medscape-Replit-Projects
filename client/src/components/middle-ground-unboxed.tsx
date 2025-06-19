import { Scale } from "lucide-react";

export default function MiddleGroundUnboxed() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <Scale className="mr-3 h-6 w-6 text-purple-600" />
        Middle Ground and Evolving Perspectives
      </h2>
      <div className="max-w-4xl mx-auto">
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-4 flex-shrink-0" />
            <span>Personalized surveillance based on recurrence risk, age, genetic factors, and treatment history may offer a better risk-benefit balance.</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-4 flex-shrink-0" />
            <span>Newer models are being tested to combine patient-reported outcomes, biomarkers, and telehealth to reduce unnecessary in-person visits.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}