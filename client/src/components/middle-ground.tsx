import { Card } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function MiddleGround() {
  return (
    <section className="rounded-xl shadow-lg p-8 mb-12" style={{ background: 'linear-gradient(90deg, rgba(6, 74, 167, 0.1) 0%, rgba(6, 74, 167, 0.15) 50%, rgba(6, 74, 167, 0.1) 100%)' }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <Scale className="mr-1 h-14 w-14 md:h-6 md:w-6" style={{ color: '#064AA7' }} />
        Middle Ground and Evolving Perspectives
      </h2>
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white rounded-lg p-6 shadow-sm">
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
        </Card>
      </div>
    </section>
  );
}