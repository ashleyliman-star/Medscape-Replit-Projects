import { Card } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function Conclusions() {
  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <Scale className="mr-3 h-6 w-6 text-gray-600" />
        Conclusions
      </h2>
      <div className="max-w-4xl mx-auto space-y-4 text-gray-700">
        <p>
          This debate highlights the complexity of primary prevention decisions in cardiovascular medicine. Both perspectives offer valid evidence-based arguments that reflect the current state of clinical practice and guideline recommendations.
        </p>
        <p>
          The pro-statin argument emphasizes the robust evidence from large-scale clinical trials and the significant public health impact of preventing cardiovascular events. The selective-use argument focuses on individualized care, patient autonomy, and the importance of comprehensive risk assessment.
        </p>
        <p>
          Ultimately, the decision should involve shared decision-making between clinicians and patients, considering individual risk factors, patient preferences, potential for lifestyle modification, and the balance of benefits versus risks in each specific case.
        </p>
      </div>
    </section>
  );
}
