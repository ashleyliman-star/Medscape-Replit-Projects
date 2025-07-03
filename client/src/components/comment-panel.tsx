import { useEffect } from "react";
import { X } from "lucide-react";
import CommentSection from "./comment-section";

interface CommentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  debateId: string;
}

export default function CommentPanel({ isOpen, onClose, debateId }: CommentPanelProps) {
  // Handle escape key to close panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 lg:w-[500px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close comments panel"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Comment Section */}
        <div className="h-full overflow-y-auto pb-16">
          <div className="p-4">
            <CommentSection debateId={debateId} />
          </div>
        </div>
      </div>
    </>
  );
}