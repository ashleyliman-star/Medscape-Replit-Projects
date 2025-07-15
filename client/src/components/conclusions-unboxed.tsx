import { useState } from "react";
import ReferencesModal from "./references-modal";
import { trackEvent } from "@/lib/analytics";

export default function ConclusionsUnboxed() {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Conclusions
      </h2>
      <div className="max-w-4xl mx-auto space-y-4 text-gray-700 text-base md:text-lg">
        <p>
          Despite many guidelines that recommend routine checks, there is limited evidence that frequent surveillance for cancer metastases in patients with asymptomatic disease improves overall survival or quality of life. However, there isn't necessarily a one-size-fits-all approach to surveillance in this patient population. The benefits and harms may vary by the cancer type and the patient, and decisions should be made on a case-by-case basis alongside the patient.
        </p>
        
        <div className="mt-6">
          <button 
            onClick={() => {
              setIsReferencesOpen(true);
              trackEvent('medscape_reference_click', 'user_interaction', 'References Button', 1);
            }}
            className="font-bold text-base md:text-lg hover:underline transition-all"
            style={{ color: '#30529a' }}
          >
            References
          </button>
        </div>
      </div>
      
      <ReferencesModal 
        isOpen={isReferencesOpen} 
        onClose={() => setIsReferencesOpen(false)} 
      />
    </section>
  );
}