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
          This debate highlights the complexity of breast cancer screening decisions in modern healthcare. Both perspectives offer valid evidence-based arguments that reflect the current state of clinical practice and evolving guideline recommendations.
        </p>
        <p>
          The pro-surveillance argument emphasizes the robust evidence from population studies showing mortality reduction and the benefits of early detection. The selective-surveillance argument focuses on individualized risk assessment, patient autonomy, and minimizing the harms of overdiagnosis and false positives.
        </p>
        <p>
          Ultimately, the decision should involve shared decision-making between clinicians and patients, considering individual risk factors, family history, patient preferences, and the balance of benefits versus risks in each specific case. The key is ensuring women have access to accurate information to make informed choices about their screening participation.
        </p>
      </div>
    </section>
  );
}
