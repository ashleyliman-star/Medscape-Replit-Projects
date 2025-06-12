import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionArgumentProps {
  title: string;
  points: string[];
  color: 'blue' | 'green' | 'purple';
}

export default function AccordionArgument({ title, points, color }: AccordionArgumentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dotColor = color === 'blue' ? 'text-blue-600' : color === 'purple' ? 'text-purple-700' : 'text-green-600';

  return (
    <div className="argument-item">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
        <div 
          className={`p-4 cursor-pointer ${isExpanded ? 'rounded-t-lg' : 'rounded-lg'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800">{title}</span>
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
                <ul className="space-y-2 text-sm text-gray-700 pt-3">
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
