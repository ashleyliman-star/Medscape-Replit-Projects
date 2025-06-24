import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

interface AccordionArgumentProps {
  title: string;
  points: string[];
  color: 'blue' | 'green' | 'purple';
  argumentIndex?: number;
  side?: 'yes' | 'no';
}

export default function AccordionArgument({ title, points, color, argumentIndex = 0, side = 'yes' }: AccordionArgumentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dotColor = color === 'blue' ? 'text-[#3DC7F5]' : color === 'purple' ? 'text-[#F07584]' : 'text-green-600';

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    // Track dropdown interaction with unique identifier
    const dropdownId = `argument_${side}_${argumentIndex + 1}`;
    const action = newState ? 'expand' : 'collapse';
    trackEvent('dropdown_interaction', 'argument_expansion', `${dropdownId}_${action}`);
  };

  return (
    <div className="argument-item">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
        <div 
          className={`p-4 cursor-pointer ${isExpanded ? 'rounded-t-lg' : 'rounded-lg'}`}
          onClick={handleToggle}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg md:text-xl text-gray-800">{title}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className={`h-4 w-4 ${dotColor}`} />
            </motion.div>
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-gray-100">
                <ul className="space-y-2 text-base md:text-lg text-gray-700 pt-3">
                  {points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 bg-black" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
