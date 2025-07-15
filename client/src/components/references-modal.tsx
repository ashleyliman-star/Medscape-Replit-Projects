import { X } from "lucide-react";

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const references = [
  "Wilson BE, Wright K, Koven R, Booth CM. Surveillance imaging after curative-intent treatment for cancer: benefits, harms, and evidence. J Clin Oncol. 2024;42(19):2245–2249",
  "Welch H, Dossett LA. Routine surveillance for cancer metastases — does it help or harm patients? N Engl J Med. 2025;392(17):1667–1670",
  "American Society of Clinical Oncology. Choosing Wisely. In: Cancer Care Initiatives – Value in Cancer Care. ASCO. Reviewed 2021.",
  "Giglio V, Schneider P, Madden K, Lin B, Multani I, Baldawi H, Thornley P, Naji L, Levin M, Wang P, Bozzo A, Wilson D, Ghert M. Published randomized controlled trials of surveillance in cancer patients ­– a systematic review. Oncol Rev. 2021;15(1):522"
];

export default function ReferencesModal({ isOpen, onClose }: ReferencesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ backgroundColor: '#5a4a7e' }}>
          <h2 className="text-xl font-semibold text-white">References</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <ol className="space-y-4">
            {references.map((reference, index) => (
              <li key={index} className="flex">
                <span className="text-gray-600 mr-3 flex-shrink-0">{index + 1}.</span>
                <span className="text-gray-800 text-sm leading-relaxed">{reference}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}