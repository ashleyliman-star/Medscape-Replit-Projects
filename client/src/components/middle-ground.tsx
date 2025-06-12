import { Card } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function MiddleGround() {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <Scale className="mr-3 h-6 w-6 text-purple-600" />
        Middle Ground and Evolving Perspectives
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">Risk-Stratified Screening</h3>
          <p className="text-gray-700">
            Many experts advocate for a personalized approach that considers individual risk factors, family history, 
            genetic predisposition, and breast density. This middle-ground strategy aims to maximize benefits while 
            minimizing harms through tailored screening intervals and methods.
          </p>
        </Card>

        <Card className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">Technological Advances</h3>
          <p className="text-gray-700">
            Emerging technologies like digital breast tomosynthesis (3D mammography), automated breast ultrasound, 
            and AI-assisted interpretation are improving detection accuracy while reducing false positives. These 
            advances may shift the risk-benefit balance of screening programs.
          </p>
        </Card>

        <Card className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">Shared Decision-Making</h3>
          <p className="text-gray-700">
            The current trend emphasizes informed patient choice, where healthcare providers present evidence-based 
            information about benefits and risks, allowing women to make decisions aligned with their values, 
            preferences, and personal circumstances.
          </p>
        </Card>

        <Card className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">Research Directions</h3>
          <p className="text-gray-700">
            Ongoing studies are investigating biomarkers for better risk prediction, shorter screening intervals 
            for high-risk populations, and strategies to reduce overdiagnosis. These developments may lead to 
            more precise screening recommendations in the future.
          </p>
        </Card>
      </div>
    </section>
  );
}