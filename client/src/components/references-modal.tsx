import { X } from "lucide-react";

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const references = [
  "Lindman BR, Braunwald E, Pellikka PA. Aortic valve replacement for asymptomatic severe aortic stenosis—the time has come. JAMA Cardiol. 2025;10(4):305-306. doi:10.1001/jamacardio.2024.5648",
  "Kang D-H, Park S-J, Lee S-A, et al. Early surgery or conservative care for asymptomatic aortic stenosis. N Engl J Med. 2020;382:111-119. doi:10.1056/NEJMoa1912846",
  "Banovic M, Putnik S, Penicka M, et al. Aortic valve replacement versus conservative treatment in asymptomatic severe aortic stenosis: the AVATAR trial. Circulation. 2022;145(9):648-658. doi:10.1161/CIRCULATIONAHA.121.057639",
  "Loganath K, Craig NJ, Everett RJ, et al. Early intervention in patients with asymptomatic severe aortic stenosis and myocardial fibrosis: the EVOLVED randomized clinical trial. JAMA. 2025;333(3):213-221. doi:10.1001/jama.2024.22730",
  "Généreux P, Schwartz A, Oldemeyer JB, et al; EARLY TAVR Trial Investigators. Transcatheter aortic-valve replacement for asymptomatic severe aortic stenosis. N Engl J Med. 2025;392(3):217-227. doi:10.1056/NEJMoa2405880",
  "Beerkens FJ, Tang GHL, Kini AS, et al. Transcatheter aortic valve replacement beyond severe aortic stenosis: JACC state-of-the-art review. JACC. 2025 Mar;85(9):944-964. doi:10.1016/j.jacc.2024.11.051",
  "Otto CM, Nishimura RA, Bonow RO, et al; Writing Committee Members. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. J Am Coll Cardiol. 2021;77(4):e25-e197. doi:10.1016/j.jacc.2020.11.018"
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