import { useState } from "react";
import ReferencesModal from "./references-modal";
import { trackEvent } from "@/lib/analytics";

export default function ConclusionsUnboxed() {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  return (
    <section className="mb-12">
      <h2 className="font-bold text-gray-900 mb-6 text-center" style={{ fontSize: '22px' }}>
        <span className="md:text-3xl">Conclusions</span>
      </h2>
      <div className="max-w-4xl mx-auto space-y-4 text-gray-700 text-base md:text-xl">
        <p>
          US guidelines from 2020 give a class I indication for aortic valve replacement in patients with severe asymptomatic AS if they have an impaired left ventricular ejection fraction (&lt; 50%) or are undergoing cardiac surgery for another indication. Proponents of early intervention say there are enough data now to update the guidelines. Opponents see limitations in the current data and believe that the clinical surveillance approach is prudent as we await more long-term data and the completion of ongoing trials.
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